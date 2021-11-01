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
import { InventoryService } from '../services';
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
  const [inventoryId, setInventoryId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const savedInventory = location?.state?.savedInventory || false;

  const handleDeleteClick = (id) => {
    setInventoryId(id);
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

    const deleted = await InventoryService.delete(auth.user, inventoryId);
    if (deleted) {
      setSnackMessage('Successfully deleted the inventory item.');
      setSnackSeverity('info');

      const inventory = await InventoryService.all(auth.user);
      if (inventory) {
        setInventoryItems(inventory);
        setCount(inventory.length);
      }
    } else {
      setSnackMessage('Failed to delete the inventory item.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  useEffect(() => {
    async function fetchAmmo() {
      const items = await InventoryService.all(auth.user);
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
        Inventory
        <Chip size="medium" label={count} className={classes.count} />
        <Link to="/inventory/item">
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
          <InventoryGrid
            inventory={inventoryItems}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the inventory item?
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

export default Inventory;
