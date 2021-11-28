import { useState, useEffect } from 'react';
import {
  Container,
  Chip,
  Typography,
  IconButton,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
    left: theme.spacing(2),
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
  const history = useHistory();
  const [ammoItems, setAmmoItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ammoId, setAmmoId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const savedAmmo = location?.state?.savedAmmo || false;

  useEffect(() => {
    if (history.location.state && history.location.state.savedAmmo) {
      const state = { ...history.location.state };
      delete state.savedAmmo;
      history.replace({ ...history.location, state });
    }
  });

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = (id) => {
    setAmmoId(id);
    setDialogOpen(true);
  };

  const handleDialogCloseDelete = async () => {
    setDialogOpen(false);

    const deleted = await AmmoService.delete(auth.user, ammoId);
    if (deleted) {
      setSnackMessage('Successfully deleted the ammo purchase.');
      setSnackSeverity('info');

      const ammoz = await AmmoService.all(auth.user);
      if (ammoz) {
        setAmmoItems(ammoz);
        setCount(ammoz.length);
      }
    } else {
      setSnackMessage('Failed to delete the ammo purchase.');
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
      setSnackMessage('Successfully saved ammo purchase.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedAmmo]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography className={classes.title} variant="h5">
        Ammo Purchases
        <Chip size="medium" label={count} className={classes.count} />
        <Link to="/ammo/item">
          <Fab color="primary" size="small" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <div>
        {loading ? (
          <>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
          </>
        ) : (
          <AmmoGrid data={ammoItems} handleDeleteClick={handleDeleteClick} />
        )}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the ammo purchase?
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
          <>
            <IconButton size="small" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
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
