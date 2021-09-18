import { useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Typography,
  InputLabel,
  Input,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CardActions,
  IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Carousel from 'react-gallery-carousel';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import 'react-gallery-carousel/dist/index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  media: {
    height: 350,
  },
  fileInput: {
    display: 'none',
  },
  carousel: {
    margin: 0,
  },
}));

function UploadFile({ name, imageSrc, setImageSrc }) {
  const DEFAULT_IMG =
    'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Image';
  const classes = useStyles();
  const fileInputRef = useRef(null);

  const images = [
    {
      src: imageSrc ? imageSrc : DEFAULT_IMG,
    },
  ];

  const handleDeleteClick = () => {
    setImageSrc(DEFAULT_IMG);
  };

  const handleFileChange = (e) => {
    if (!e.target.files.length) {
      setImageSrc(DEFAULT_IMG);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">{name}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <PhotoCameraIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick()}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardMedia className={classes.media}>
          <Carousel
            images={images}
            className={classes.carousel}
            pauseIcon={false}
            hasLeftButton={false}
            hasRightButton={false}
            hasIndexBoard={false}
            hasThumbnails={false}
            isAutoPlaying={false}
            hasThumbnailsAtMax={false}
            playIcon={false}
            objectFit="contain"
            shouldMaximizeOnClick
            shouldMinimizeOnClick
          />
        </CardMedia>
      </Card>
      <InputLabel className={classes.root}>
        <Input
          ref={fileInputRef}
          inputProps={{
            accept: 'image/*',
          }}
          type="file"
          className={classes.fileInput}
          onChange={handleFileChange}
        />
      </InputLabel>
    </>
  );
}

UploadFile.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  setImageSrc: PropTypes.func.isRequired,
};

export { UploadFile };
