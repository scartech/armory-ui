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
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { GunService } from '../services';
import { GunsComponent } from '../components';

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

function Guns() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [guns, setGuns] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gunId, setGunId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [useGrid, setUseGrid] = useState(false);

  const savedGun = location?.state?.savedGun || false;

  const handleUseGridClick = () => {
    setUseGrid(!useGrid);
    localStorage.setItem('useGrid', !useGrid);
  };

  const handleDeleteClick = (id) => {
    setGunId(id);
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
        setLoading(false);
        setGuns(gunz);
        setCount(gunz.length);
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

  useEffect(() => {
    if (localStorage.getItem('useGrid')) {
      setUseGrid(JSON.parse(localStorage.getItem('useGrid')));
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography className={classes.title} variant="h4">
        Guns
        <Chip size="medium" label={count} className={classes.count} />
        <Fab
          color="primary"
          variant="circular"
          className={classes.fab}
          onClick={handleUseGridClick}
        >
          {useGrid ? <ViewCompactIcon /> : <GridOnIcon />}
        </Fab>
        <Link to="/gun">
          <Fab color="primary" variant="circular" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <div className={classes.container}>
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
          <GunsComponent
            useGrid={useGrid}
            guns={guns}
            handleDeleteClick={handleDeleteClick}
          />
        )}
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

export default Guns;
