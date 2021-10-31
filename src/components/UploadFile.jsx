import { useRef, useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import Carousel from 'react-gallery-carousel';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const images = [
    {
      src: imageSrc,
    },
  ];

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogCloseDelete = async () => {
    setImageSrc(DEFAULT_IMG);
    setDialogOpen(false);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleFileChange = (e) => {
    if (!e.target.files.length) {
      setImageSrc(DEFAULT_IMG);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
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
        <CardActions>
          <IconButton
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            size="large"
          >
            <PhotoCameraIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick()} size="large">
            <DeleteIcon />
          </IconButton>
        </CardActions>
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
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the picture?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UploadFile.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  setImageSrc: PropTypes.func.isRequired,
};

export default UploadFile;
