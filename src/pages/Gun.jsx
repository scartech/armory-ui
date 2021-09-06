import { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  InputAdornment,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../hooks';
import { GunService } from '../services';
import { ACTION_TYPES, GUN_TYPES } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: theme.spacing(4),
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  cancelButton: {
    textDecoration: 'none',
  },
}));

export function Gun() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();

  const [modelName, setModelName] = useState('');
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [caliber, setCaliber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [dealer, setDealer] = useState('');
  const [action, setAction] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchGun() {
      const gun = await GunService.getGun(auth.user, id);
      if (gun) {
        setModelName(gun.modelName || '');
        setName(gun.name || '');
        setManufacturer(gun.manufacturer || '');
        setSerialNumber(gun.serialNumber || '');
        setType(gun.type || '');
        setCaliber(gun.caliber || '');
        setPurchasePrice(gun.purchasePrice || 0);
        setPurchaseDate(gun.purchaseDate || null);
        setDealer(gun.dealer || '');
        setAction(gun.action);
      }
    }

    fetchGun();
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      modelName,
      name,
      manufacturer,
      serialNumber,
      type,
      caliber,
      purchaseDate: purchaseDate || null,
      purchasePrice: purchasePrice || 0,
      dealer,
      action,
    };

    setOpen(false);

    const gun = await GunService.updateGun(auth.user, id, data);
    if (gun) {
      setModelName(gun.modelName || '');
      setName(gun.name || '');
      setManufacturer(gun.manufacturer || '');
      setSerialNumber(gun.serialNumber || '');
      setType(gun.type || '');
      setCaliber(gun.caliber || '');
      setPurchasePrice(gun.purchasePrice || 0);
      setPurchaseDate(gun.purchaseDate || '');
      setDealer(gun.dealer || '');
      setAction(gun.action);

      setSeverity('info');
      setMessage('Gun saved successfully.');
    } else {
      setSeverity('error');
      setMessage('Unable to save the gun.');
    }

    setOpen(true);
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography className={classes.title} variant="h3">
          Edit Gun
        </Typography>
        <TextField
          className={classes.text}
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Serial Number"
          value={serialNumber}
          onChange={(event) => setSerialNumber(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Manufacturer"
          value={manufacturer}
          onChange={(event) => setManufacturer(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Model"
          value={modelName}
          onChange={(event) => setModelName(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Type"
          select
          value={type}
          onChange={(event) => setType(event.target.value)}
          fullWidth
        >
          {GUN_TYPES.map((gunType) => (
            <MenuItem key={gunType} value={gunType}>
              {gunType}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.text}
          label="Action"
          select
          value={action}
          onChange={(event) => setAction(event.target.value)}
          fullWidth
        >
          {ACTION_TYPES.map((actionType) => (
            <MenuItem key={actionType} value={actionType}>
              {actionType}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.text}
          label="Caliber"
          value={caliber}
          onChange={(event) => setCaliber(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Dealer"
          value={dealer}
          onChange={(event) => setDealer(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Purchase Price"
          value={purchasePrice}
          type="number"
          onChange={(event) => setPurchasePrice(event.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          className={classes.text}
          label="Purchase Date"
          value={purchaseDate}
          type="date"
          fullWidth
          onChange={(event) => setPurchaseDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
        <Link to="/" className={classes.cancelButton}>
          <Button variant="contained" fullWidth>
            Cancel
          </Button>
        </Link>
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
    </>
  );
}
