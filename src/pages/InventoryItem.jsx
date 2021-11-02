import { useState, useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
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
import { AmmoInventoryService } from '../services';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(2),
  },
}));

function InventoryItem() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [caliber, setCaliber] = useState('');
  const [brand, setBrand] = useState('');
  const [goal, setGoal] = useState(0);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [inventoryId, setInventoryId] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  useEffect(() => {
    async function fetchInventory() {
      const inventory = await AmmoInventoryService.get(auth.user, id);
      if (inventory) {
        setName(inventory.name ?? '');
        setCaliber(inventory.caliber ?? '');
        setBrand(inventory.brand ?? '');
        setGoal(inventory.goal ?? 0);
      }
    }

    setInventoryId(id);

    if (Boolean(id)) {
      fetchInventory();
    }
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      goal: goal || 0,
    };

    setOpen(false);

    const inventoryItem = await AmmoInventoryService.update(
      auth.user,
      inventoryId,
      data,
    );

    if (inventoryItem) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the inventory item.');
      setOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Typography className={classes.title} variant="h5">
          Edit Ammo Inventory
          <Link to="/inventory">
            <Fab color="primary" size="small" className={classes.fab}>
              <ArrowBackIcon />
            </Fab>
          </Link>
        </Typography>
        <TextField
          label="Caliber"
          value={caliber}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Brand"
          value={brand}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Name"
          value={name}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Goal"
          value={goal}
          variant="outlined"
          margin="normal"
          type="number"
          onChange={(event) => setGoal(event.target.value)}
          fullWidth
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
          <>
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {fireRedirect && (
        <Redirect
          to={{ pathname: '/inventory', state: { savedInventory: true } }}
        />
      )}
    </>
  );
}

export default InventoryItem;
