import { useState, useEffect, Fragment } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Fab,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { GunService } from '../services';
import { GunCard } from '../components';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(3),
  },
  container: {
    margin: 'auto',
    width: '1000',
  },
}));

function Home() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [guns, setGuns] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gunId, setGunId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');

  const savedGun = location?.state?.savedGun || false;

  const handleDeleteClick = (id) => {
    setGunId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = (event) => {
    setDialogOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogCloseDelete = async (event) => {
    setDialogOpen(false);

    const deleted = await GunService.delete(auth.user, gunId);
    if (deleted) {
      setSnackMessage('Successfully deleted the gun.');
      setSnackSeverity('info');

      const gunz = await GunService.all(auth.user);
      if (gunz) {
        setGuns(gunz);
      }
    } else {
      setSnackMessage('Failed to delete the gun.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  useEffect(() => {
    async function fetchGuns() {
      const gunz = await GunService.all(auth.user);
      if (gunz) {
        setGuns(gunz);
      }
    }

    fetchGuns();
  }, [auth.user]);

  useEffect(() => {
    if (savedGun) {
      setSnackMessage('Successfully saved gun.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedGun]);

  return (
    <Container maxWidth="sm">
      <Typography className={classes.title} variant="h4">
        Guns
        <Link to="/gun">
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <div className={classes.container}>
        {guns.map((gun) => {
          return <GunCard gun={gun} handleDeleteClick={handleDeleteClick} />;
        })}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the gun?
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        action={
          <Fragment>
            <IconButton size="small" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert onClose={handleSnackClose} severity={snackSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export { Home };
