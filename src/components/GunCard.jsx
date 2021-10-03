import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Carousel from 'react-gallery-carousel';
import GunCardItem from './GunCardItem';
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
  const classes = useStyles();

  const images = [
    {
      src: gun.frontImage
        ? gun.frontImage
        : 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Front%20Image',
    },
    {
      src: gun.backImage
        ? gun.backImage
        : 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Rear%20Image',
    },
    {
      src: gun.serialImage
        ? gun.serialImage
        : 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Serial%20Image',
    },
  ];

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
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/gun/${gun.id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <Link to={`/images/${gun.id}`}>
          <IconButton>
            <PhotoCameraIcon />
          </IconButton>
        </Link>
        <Link to={`/gun/${gun.id}/history`}>
          <IconButton>
            <EventNoteIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleDeleteClick(`${gun.id}`)}>
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
