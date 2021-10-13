import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  Divider,
  Typography,
  Snackbar,
  IconButton,
  Fab,
  Alert,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../hooks';
import { GunService } from '../services';
import { UploadFile } from '../components';

const DEFAULT_IMG =
  'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=No%20Image';

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(3),
  },
  fileInput: {
    display: 'none',
  },
  divider: {
    margin: theme.spacing(5),
  },
}));

function Pictures() {
  const auth = useAuth();
  const classes = useStyles();

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [gunId, setGunId] = useState(null);
  const [name, setName] = useState('');
  const [frontImageSrc, setFrontImageSrc] = useState(DEFAULT_IMG);
  const [backImageSrc, setBackImageSrc] = useState(DEFAULT_IMG);
  const [serialImageSrc, setSerialImageSrc] = useState(DEFAULT_IMG);
  const [fireRedirect, setFireRedirect] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      frontImage: frontImageSrc,
      backImage: backImageSrc,
      serialImage: serialImageSrc,
    };

    setOpen(false);

    const success = await GunService.updateImages(auth.user, gunId, data);
    if (success) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the images.');
      setOpen(true);
    }
  };

  useEffect(() => {
    async function fetchGun() {
      const gun = await GunService.get(auth.user, id);
      if (gun) {
        setName(gun.name);
        setFrontImageSrc(gun.frontImage ?? DEFAULT_IMG);
        setBackImageSrc(gun.backImage ?? DEFAULT_IMG);
        setSerialImageSrc(gun.serialImage ?? DEFAULT_IMG);
      }
    }

    setGunId(id);
    if (Boolean(id)) {
      fetchGun();
    }
  }, [auth.user, id]);

  return (
    <>
      <form noValidate autoComplete="off">
        <Typography className={classes.title} variant="h4">
          {name}
          <Link to="/guns">
            <Fab color="primary" className={classes.fab}>
              <ArrowBackIcon />
            </Fab>
          </Link>
        </Typography>
        <UploadFile
          key="front"
          name="Front View"
          imageSrc={frontImageSrc}
          setImageSrc={setFrontImageSrc}
        />
        <Divider variant="middle" className={classes.divider} />
        <UploadFile
          key="back"
          name="Rear View"
          imageSrc={backImageSrc}
          setImageSrc={setBackImageSrc}
        />
        <Divider variant="middle" className={classes.divider} />
        <UploadFile
          key="serial"
          name="Serial Number"
          imageSrc={serialImageSrc}
          setImageSrc={setSerialImageSrc}
        />
        <Button
          variant="contained"
          onClick={(event) => handleSubmit(event)}
          fullWidth
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        action={
          <Fragment>
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {fireRedirect && (
        <Redirect to={{ pathname: '/guns', state: { savedGun: true } }} />
      )}
    </>
  );
}

export default Pictures;
