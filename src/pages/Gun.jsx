import { useState, useEffect, useMemo, Fragment } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  Snackbar,
  IconButton,
  Fab,
  Alert,
  Autocomplete,
  Rating,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import countryList from 'react-select-country-list';
import { useAuth } from '../hooks';
import { GunService } from '../services';
import { ACTION_TYPES, GUN_TYPES, CALIBER_TYPES } from '../utils';

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
    left: theme.spacing(3),
  },
}));

function Gun() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [isNew, setIsNew] = useState(true);
  const [modelName, setModelName] = useState('');
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [caliber, setCaliber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [dealer, setDealer] = useState('');
  const [ffl, setFfl] = useState('');
  const [action, setAction] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [gunId, setGunId] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);
  const [rating, setRating] = useState(0);
  const [country, setCountry] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    async function fetchGun() {
      const gun = await GunService.get(auth.user, id);
      if (gun) {
        setModelName(gun.modelName ?? '');
        setName(gun.name ?? '');
        setManufacturer(gun.manufacturer ?? '');
        setSerialNumber(gun.serialNumber ?? '');
        setType(gun.type ?? '');
        setCaliber(gun.caliber ?? '');
        setPurchasePrice(gun.purchasePrice ?? 0);
        setPurchaseDate(gun.purchaseDate ?? null);
        setDealer(gun.dealer ?? '');
        setAction(gun.action ?? '');
        setFfl(gun.ffl ?? '');
        setRating(parseFloat(gun.rating));
        setCountry(gun.country ?? '');
        setEstimatedValue(gun.estimatedValue ?? 0);
        setNotes(gun.notes ?? '');
      }
    }

    setIsNew(!Boolean(id));
    setGunId(id);

    if (Boolean(id)) {
      fetchGun();
    }
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event, isNewGun) => {
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
      ffl,
      rating,
      country,
      estimatedValue,
      notes,
    };

    setOpen(false);

    let gun;
    if (isNewGun) {
      gun = await GunService.create(auth.user, data);
    } else {
      gun = await GunService.update(auth.user, gunId, data);
    }

    if (gun) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the gun.');
      setOpen(true);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h4">
            {isNew ? 'New Gun' : 'Edit Gun'}
            <Link to="/guns">
              <Fab color="primary" aria-label="back" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Typography>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            precision={0.5}
            onChange={(event, value) => setRating(value)}
          />
          <TextField
            label="Name"
            value={name}
            variant="standard"
            margin="normal"
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Serial Number"
            value={serialNumber}
            variant="standard"
            margin="normal"
            onChange={(event) => setSerialNumber(event.target.value)}
            fullWidth
          />
          <TextField
            label="Manufacturer"
            value={manufacturer}
            variant="standard"
            margin="normal"
            onChange={(event) => setManufacturer(event.target.value)}
            fullWidth
          />
          <TextField
            label="Model"
            value={modelName}
            variant="standard"
            margin="normal"
            onChange={(event) => setModelName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Type"
            select
            value={type}
            variant="standard"
            margin="normal"
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
            label="Action"
            select
            value={action}
            variant="standard"
            margin="normal"
            onChange={(event) => setAction(event.target.value)}
            fullWidth
          >
            {ACTION_TYPES.map((actionType) => (
              <MenuItem key={actionType} value={actionType}>
                {actionType}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            freeSolo
            autoSelect
            options={CALIBER_TYPES}
            value={caliber}
            onChange={(event, value) => setCaliber(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Caliber"
                margin="normal"
                fullWidth
              />
            )}
          />
          <TextField
            label="Dealer"
            value={dealer}
            variant="standard"
            margin="normal"
            onChange={(event) => setDealer(event.target.value)}
            fullWidth
          />
          <TextField
            label="FFL"
            value={ffl}
            variant="standard"
            margin="normal"
            onChange={(event) => setFfl(event.target.value)}
            fullWidth
          />
          <Autocomplete
            freeSolo
            autoSelect
            options={countryOptions}
            value={country}
            onChange={(event, value) => setCountry(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Country of Origin"
                margin="normal"
                fullWidth
              />
            )}
          />
          <TextField
            label="Estimated Value"
            value={estimatedValue}
            variant="standard"
            type="number"
            margin="normal"
            onChange={(event) => setEstimatedValue(event.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Purchase Price"
            value={purchasePrice}
            variant="standard"
            type="number"
            margin="normal"
            onChange={(event) => setPurchasePrice(event.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <DatePicker
            clearable
            label="Purchase Date"
            value={purchaseDate}
            onChange={(date) => setPurchaseDate(date)}
            format="MM/DD/yyyy"
            renderInput={(params) => (
              <TextField variant="standard" margin="normal" {...params} />
            )}
          />
          <TextField
            label="Notes"
            value={notes}
            variant="standard"
            margin="normal"
            onChange={(event) => setNotes(event.target.value)}
            fullWidth
            multiline
            rows={4}
            maxRows={4}
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
        {fireRedirect && (
          <Redirect to={{ pathname: '/guns', state: { savedGun: true } }} />
        )}
      </LocalizationProvider>
    </>
  );
}

export default Gun;
