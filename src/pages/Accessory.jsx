import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  IconButton,
  Fab,
  Alert,
  Autocomplete,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import countryList from 'react-select-country-list';
import { useAuth } from '../hooks';
import { AccessoryService } from '../services';
import { ACCESSORY_TYPES } from '../utils';
import { SimpleGunPicker } from '../components';

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

function Accessory() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();

  const countryOptions = useMemo(() => countryList().getData(), []);

  const [isNew, setIsNew] = useState(true);
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [modelName, setModelName] = useState('');
  const [purchasedFrom, setPurchasedFrom] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [manufacturer, setManufacturer] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [count, setCount] = useState(1);
  const [storageLocation, setStorageLocation] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [gunIds, setGunIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [accessoryId, setAccessoryId] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  useEffect(() => {
    async function fetchAccessory() {
      const accessory = await AccessoryService.get(auth.user, id);
      if (accessory) {
        setType(accessory.type ?? '');
        setNotes(accessory.notes ?? '');
        setModelName(accessory.modelName ?? '');
        setManufacturer(accessory.manufacturer ?? '');
        setCountry(accessory.country ?? '');
        setStorageLocation(accessory.storageLocation ?? '');
        setSerialNumber(accessory.serialNumber ?? '');
        setManufactureYear(accessory.manufactureYear ?? '');
        setPurchasedFrom(accessory.purchasedFrom ?? '');
        setPurchasePrice(accessory.purchasePrice ?? 0);
        setPurchaseDate(accessory.purchaseDate ?? null);
        setCount(accessory.count ?? 1);
        setGunIds(accessory.guns ? accessory.guns.map((x) => x.id) : []);
      }
    }

    setIsNew(!Boolean(id));
    setAccessoryId(id);

    if (Boolean(id)) {
      fetchAccessory();
    }
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGunItemDelete = (gunId) => {
    setGunIds(gunIds.filter((x) => x !== gunId));
  };

  const handleSubmit = async (event, isNewAccessory) => {
    event.preventDefault();

    const data = {
      type,
      modelName,
      manufacturer,
      country,
      storageLocation,
      serialNumber,
      manufactureYear,
      count,
      notes,
      purchasedFrom,
      purchaseDate: purchaseDate || null,
      purchasePrice: purchasePrice || 0,
      gunIds,
    };

    setOpen(false);

    let accessoryItem;
    if (isNewAccessory) {
      accessoryItem = await AccessoryService.create(auth.user, data);
    } else {
      accessoryItem = await AccessoryService.update(
        auth.user,
        accessoryId,
        data,
      );
    }

    if (accessoryItem) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the accessory.');
      setOpen(true);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h5">
            {isNew ? 'New Accessory' : 'Edit Accessory'}
            <Link to="/accessories">
              <Fab color="primary" size="small" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Typography>
          <Autocomplete
            freeSolo
            autoSelect
            options={ACCESSORY_TYPES}
            value={type}
            onChange={(event, value) => setType(value)}
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
          <TextField
            label="Model Name"
            value={modelName}
            variant="outlined"
            margin="normal"
            onChange={(event) => setModelName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Manufacturer"
            value={manufacturer}
            variant="outlined"
            margin="normal"
            onChange={(event) => setManufacturer(event.target.value)}
            fullWidth
          />
          <TextField
            label="Serial Number"
            value={serialNumber}
            variant="outlined"
            margin="normal"
            onChange={(event) => setSerialNumber(event.target.value)}
            fullWidth
          />
          <TextField
            label="Storage Location"
            value={storageLocation}
            variant="outlined"
            margin="normal"
            onChange={(event) => setStorageLocation(event.target.value)}
            fullWidth
          />
          <TextField
            label="Year Manufactured"
            value={manufactureYear}
            variant="outlined"
            margin="normal"
            onChange={(event) => setManufactureYear(event.target.value)}
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
                variant="outlined"
                label="Country of Origin"
                margin="normal"
                fullWidth
              />
            )}
          />
          <TextField
            label="Count"
            value={count}
            variant="outlined"
            type="number"
            margin="normal"
            onChange={(event) => setCount(event.target.value)}
            fullWidth
          />
          <TextField
            label="Purchased From"
            value={purchasedFrom}
            variant="outlined"
            margin="normal"
            onChange={(event) => setPurchasedFrom(event.target.value)}
            fullWidth
          />
          <DatePicker
            clearable
            label="Purchase Date"
            value={purchaseDate}
            onChange={(date) => setPurchaseDate(date)}
            format="MM/DD/yyyy"
            renderInput={(params) => (
              <TextField margin="normal" variant="outlined" {...params} />
            )}
          />
          <TextField
            label="Purchase Price"
            value={purchasePrice}
            variant="outlined"
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
          <TextField
            label="Notes"
            value={notes}
            variant="outlined"
            margin="normal"
            multiline
            onChange={(event) => setNotes(event.target.value)}
            fullWidth
          />
          <SimpleGunPicker
            selectedGunIds={gunIds}
            setSelectedGunIds={setGunIds}
            handleItemDelete={handleGunItemDelete}
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
            to={{ pathname: '/accessories', state: { savedAccessory: true } }}
          />
        )}
      </LocalizationProvider>
    </>
  );
}

export default Accessory;
