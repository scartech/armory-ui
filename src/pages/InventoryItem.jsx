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
  Autocomplete,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../hooks';
import { InventoryService } from '../services';
import { INVENTORY_TYPES, CALIBER_TYPES } from '../utils';

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

  const [isNew, setIsNew] = useState(true);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(0);
  const [open, setOpen] = useState(false);
  const [nameLabel, setNameLabel] = useState('Name');
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [inventoryId, setInventoryId] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  const updateNameLabel = (itemType) => {
    switch (itemType) {
      case 'Ammunition':
        setNameLabel('Caliber');
        break;
      case 'Magazine':
        setNameLabel('Caliber & Capacity');
        break;
      default:
        setNameLabel('Name');
        break;
    }
  };

  useEffect(() => {
    async function fetchInventory() {
      const inventory = await InventoryService.get(auth.user, id);
      if (inventory) {
        setName(inventory.name ?? '');
        setType(inventory.type ?? '');
        setCount(inventory.count ?? 0);
        setGoal(inventory.goal ?? 0);

        updateNameLabel(inventory.type);
      }
    }

    setIsNew(!Boolean(id));
    setInventoryId(id);

    if (Boolean(id)) {
      fetchInventory();
    }
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeChange = (event, value) => {
    setType(value);
    updateNameLabel(value);
  };

  const handleSubmit = async (event, isNewInventory) => {
    event.preventDefault();

    const data = {
      name,
      type,
      count: count || 0,
      goal: goal || 0,
    };

    setOpen(false);

    let inventoryItem;
    if (isNewInventory) {
      inventoryItem = await InventoryService.create(auth.user, data);
    } else {
      inventoryItem = await InventoryService.update(
        auth.user,
        inventoryId,
        data,
      );
    }

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
          {isNew ? 'New Inventory' : 'Edit Inventory'}
          <Link to="/inventory">
            <Fab color="primary" size="small" className={classes.fab}>
              <ArrowBackIcon />
            </Fab>
          </Link>
        </Typography>
        <Autocomplete
          freeSolo
          autoSelect
          options={INVENTORY_TYPES}
          value={type}
          onChange={handleTypeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              variant="outlined"
              label="Type"
              fullWidth
            />
          )}
        />
        <Autocomplete
          freeSolo
          autoSelect
          options={CALIBER_TYPES}
          value={name}
          onChange={(event, value) => setName(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              variant="outlined"
              label={nameLabel}
              fullWidth
            />
          )}
        />
        <TextField
          label="Count"
          value={count}
          variant="outlined"
          margin="normal"
          type="number"
          onChange={(event) => setCount(event.target.value)}
          fullWidth
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
          onClick={(event) => handleSubmit(event, isNew)}
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
