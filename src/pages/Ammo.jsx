import { useState, useEffect, Fragment } from 'react';
import {
  Container,
  Chip,
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
import { Alert, Skeleton } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { AmmoService } from '../services';
import { AmmoGrid } from '../components';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  container: {
    margin: 'auto',
  },
  count: {
    marginLeft: theme.spacing(1),
  },
  skeletonContainer: {
    marginBottom: theme.spacing(4),
  },
}));

function Ammo() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [ammoItems, setAmmoItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ammoId, setAmmoId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const savedAmmo = location?.state?.savedAmmo || false;

  const handleDeleteClick = (id) => {
    setAmmoId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogCloseDelete = async () => {
    setDialogOpen(false);

    const deleted = await AmmoService.delete(auth.user, ammoId);
    if (deleted) {
      setSnackMessage('Successfully deleted the ammo.');
      setSnackSeverity('info');

      const ammoz = await AmmoService.all(auth.user);
      if (ammoz) {
        setAmmoItems(ammoz);
      }
    } else {
      setSnackMessage('Failed to delete the ammo.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  useEffect(() => {
    async function fetchAmmo() {
      const ammoz = await AmmoService.all(auth.user);
      if (ammoz) {
        setLoading(false);
        setAmmoItems(ammoz);
        setCount(ammoz.length);
      }
    }

    fetchAmmo();
  }, [auth.user]);

  useEffect(() => {
    if (savedAmmo) {
      setSnackMessage('Successfully saved ammo.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedAmmo]);

  return (
    <Container maxWidth="xl">
      <Typography className={classes.title} variant="h4">
        Ammo
        <Chip size="medium" label={count} className={classes.count} />
        <Link to="/ammo/item">
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <div className={classes.container}>
        {loading ? (
          <>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rect" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rect" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rect" height={250} />
            </div>
          </>
        ) : (
          <AmmoGrid ammo={ammoItems} handleDeleteClick={handleDeleteClick} />
        )}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the ammo?
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

export default Ammo;
