import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Typography,
  Rating,
} from '@mui/material';
import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Carousel from 'react-gallery-carousel';
import GunCardItem from './GunCardItem';
import { useAuth } from '../hooks';
import { GunService } from '../services';
import 'react-gallery-carousel/dist/index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  media: {
    height: 220,
  },
  carousel: {
    margin: 0,
  },
}));

function GunCard({ gun, handleDeleteClick }) {
  const auth = useAuth();
  const classes = useStyles();

  const [frontImage, setFrontImage] = useState({
    type: 'front',
    src: 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Front%20Image',
  });

  const [backImage, setBackImage] = useState({
    type: 'back',
    src: 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Back%20Image',
  });

  const [serialImage, setSerialImage] = useState({
    type: 'serial',
    src: 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Serial%20Image',
  });

  const [receiptImage, setReceiptImage] = useState({
    type: 'receipt',
    src: 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Receipt%20Image',
  });

  const [images, setImages] = useState([
    frontImage,
    backImage,
    serialImage,
    receiptImage,
  ]);

  useEffect(() => {
    async function fetchImage(type) {
      const image = await GunService.getImage(auth.user, gun.id, type);

      if (image) {
        switch (type) {
          case 'front':
            setFrontImage(image);
            break;
          case 'back':
            setBackImage(image);
            break;
          case 'serial':
            setSerialImage(image);
            break;
          case 'receipt':
            setReceiptImage(image);
            break;
          default:
            break;
        }
      }
    }

    if (gun.hasFrontRawImage) {
      fetchImage('front');
    }

    if (gun.hasBackRawImage) {
      fetchImage('back');
    }

    if (gun.hasSerialRawImage) {
      fetchImage('serial');
    }

    if (gun.hasReceiptRawImage) {
      fetchImage('receipt');
    }
  }, [gun, auth.user]);

  useEffect(() => {
    setImages([frontImage, backImage, serialImage, receiptImage]);
  }, [frontImage, backImage, serialImage, receiptImage]);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media}>
        <Carousel
          images={images}
          className={classes.carousel}
          maxIcon={false}
          pauseIcon={false}
          miniIcon={false}
          hasIndexBoard={false}
          isAutoPlaying={false}
          hasThumbnails={false}
          playIcon={false}
          hasThumbnailsAtMax
          shouldMaximizeOnClick
          shouldMinimizeOnClick
        />
      </CardMedia>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">{gun.name}</Typography>
          </Grid>
          <GunCardItem label="Manufacturer" value={gun.manufacturer} />
          <GunCardItem label="Model" value={gun.modelName} />
          <GunCardItem label="Serial Number" value={gun.serialNumber} />
          <GunCardItem label="Type" value={gun.type} />
          <GunCardItem label="Action" value={gun.action} />
          <GunCardItem label="Caliber" value={gun.caliber} />
          <GunCardItem label="Dealer" value={gun.dealer} />
          <GunCardItem label="FFL" value={gun.ffl} />
          <Grid item xs={12}>
            <Rating value={gun.rating} precision={0.5} readOnly />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/gun/${gun.id}`}>
          <IconButton size="large">
            <EditIcon />
          </IconButton>
        </Link>
        <Link to={`/images/${gun.id}`}>
          <IconButton size="large">
            <PhotoCameraIcon />
          </IconButton>
        </Link>
        <Link to={`/gun/${gun.id}/history`}>
          <IconButton size="large">
            <EventNoteIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleDeleteClick(`${gun.id}`)} size="large">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

GunCard.propTypes = {
  gun: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunCard;
