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
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { AccessoryService } from '../services';
import { AccessoryGrid } from '../components';

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

function Accessories() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [accessories, setAccessories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accessoryId, setAccessoryId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const savedAccessory = location?.state?.savedAccessory || false;

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = (id) => {
    setAccessoryId(id);
    setDialogOpen(true);
  };

  const handleDialogCloseDelete = async () => {
    setDialogOpen(false);

    const deleted = await AccessoryService.delete(auth.user, accessoryId);
    if (deleted) {
      setSnackMessage('Successfully deleted the accessory.');
      setSnackSeverity('info');

      const items = await AccessoryService.all(auth.user);
      if (items) {
        setAccessories(items);
        setCount(items.length);
      }
    } else {
      setSnackMessage('Failed to delete the accessory.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  useEffect(() => {
    async function fetchAccessories() {
      const items = await AccessoryService.all(auth.user);
      if (items) {
        setLoading(false);
        setAccessories(items);
        setCount(items.length);
      }
    }

    fetchAccessories();
  }, [auth.user]);

  useEffect(() => {
    if (savedAccessory) {
      setSnackMessage('Successfully saved the accessory.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedAccessory]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography className={classes.title} variant="h5">
        Accessories
        <Chip size="medium" label={count} className={classes.count} />
        <Link to="/accessory">
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
          <AccessoryGrid
            data={accessories}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the accessory?
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

export default Accessories;
