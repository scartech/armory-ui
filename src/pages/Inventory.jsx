import { useState, useEffect } from 'react';
import {
  Container,
  Chip,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { AmmoInventoryService } from '../services';
import { InventoryGrid } from '../components';

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

function Inventory() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();

  const [inventoryItems, setInventoryItems] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const savedInventory = location?.state?.savedInventory || false;

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogCloseDelete = async () => {
    setDialogOpen(false);

    const deleted = await AmmoInventoryService.delete(auth.user, deleteId);
    if (deleted) {
      setSnackMessage('Successfully deleted the inventory.');
      setSnackSeverity('info');

      const items = await AmmoInventoryService.all(auth.user);
      if (items) {
        setInventoryItems(items);
        setCount(items.length);
      }
    } else {
      setSnackMessage('Failed to delete the inventory.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  useEffect(() => {
    async function fetchAmmo() {
      const items = await AmmoInventoryService.all(auth.user);
      if (items) {
        setLoading(false);
        setInventoryItems(items);
        setCount(items.length);
      }
    }

    fetchAmmo();
  }, [auth.user]);

  useEffect(() => {
    if (savedInventory) {
      setSnackMessage('Successfully saved the inventory item.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedInventory]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography className={classes.title} variant="h5">
        Ammo Inventory
        <Chip size="medium" label={count} className={classes.count} />
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
          <InventoryGrid
            inventory={inventoryItems}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </div>
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
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the inventory?
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
    </Container>
  );
}

export default Inventory;
