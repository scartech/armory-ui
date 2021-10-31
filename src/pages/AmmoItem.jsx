import { useState, useEffect, Fragment } from 'react';
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
import { useAuth } from '../hooks';
import { AmmoService } from '../services';
import { CALIBER_TYPES } from '../utils';

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

function AmmoItem() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();

  const [isNew, setIsNew] = useState(true);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [caliber, setCaliber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [weight, setWeight] = useState('');
  const [bulletType, setBulletType] = useState('');
  const [muzzleVelocity, setMuzzleVelocity] = useState('');
  const [purchasedFrom, setPurchasedFrom] = useState('');
  const [roundCount, setRoundCount] = useState(0);
  const [pricePerRound, setPricePerRound] = useState(0);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [ammoId, setAmmoId] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  useEffect(() => {
    async function fetchAmmo() {
      const ammo = await AmmoService.get(auth.user, id);
      if (ammo) {
        setBrand(ammo.brand ?? '');
        setName(ammo.name ?? '');
        setWeight(ammo.weight ?? '');
        setBulletType(ammo.bulletType ?? '');
        setMuzzleVelocity(ammo.muzzleVelocity ?? '');
        setCaliber(ammo.caliber ?? '');
        setPurchasePrice(ammo.purchasePrice ?? 0);
        setPurchaseDate(ammo.purchaseDate ?? null);
        setPurchasedFrom(ammo.purchasedFrom ?? '');
        setRoundCount(ammo.roundCount ?? 0);
        setPricePerRound(ammo.pricePerRound ?? 0);
      }
    }

    setIsNew(!Boolean(id));
    setAmmoId(id);

    if (Boolean(id)) {
      fetchAmmo();
    }
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event, isNewAmmo) => {
    event.preventDefault();

    const data = {
      brand,
      name,
      caliber,
      weight,
      bulletType,
      muzzleVelocity,
      roundCount,
      pricePerRound,
      purchasedFrom,
      purchaseDate: purchaseDate || null,
      purchasePrice: purchasePrice || 0,
    };

    setOpen(false);

    let ammoItem;
    if (isNewAmmo) {
      ammoItem = await AmmoService.create(auth.user, data);
    } else {
      ammoItem = await AmmoService.update(auth.user, ammoId, data);
    }

    if (ammoItem) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the ammo.');
      setOpen(true);
    }
  };

  const handleRoundCountChange = (e) => {
    const { value } = e.target;
    setRoundCount(value);

    if (purchasePrice > 0) {
      const perRound = purchasePrice / value;
      setPricePerRound(perRound.toFixed(4));
    }
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setPurchasePrice(value);

    if (roundCount > 0) {
      const perRound = value / roundCount;
      setPricePerRound(perRound.toFixed(4));
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h5">
            {isNew ? 'New Ammo Purchase' : 'Edit Ammo Purchase'}
            <Link to="/ammo">
              <Fab color="primary" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Typography>
          <TextField
            label="Brand"
            value={brand}
            variant="standard"
            margin="normal"
            onChange={(event) => setBrand(event.target.value)}
            fullWidth
          />
          <Autocomplete
            freeSolo
            autoSelect
            options={CALIBER_TYPES}
            value={caliber}
            onChange={(event, value) => setCaliber(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                variant="standard"
                label="Caliber"
                fullWidth
              />
            )}
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
            label="Bullet Type"
            value={bulletType}
            variant="standard"
            margin="normal"
            onChange={(event) => setBulletType(event.target.value)}
            fullWidth
          />
          <TextField
            label="Weight"
            value={weight}
            variant="standard"
            margin="normal"
            onChange={(event) => setWeight(event.target.value)}
            fullWidth
          />
          <TextField
            label="Muzzle Velocity"
            value={muzzleVelocity}
            variant="standard"
            margin="normal"
            onChange={(event) => setMuzzleVelocity(event.target.value)}
            fullWidth
          />
          <DatePicker
            clearable
            label="Purchase Date"
            value={purchaseDate}
            onChange={(date) => setPurchaseDate(date)}
            format="MM/DD/yyyy"
            renderInput={(params) => (
              <TextField margin="normal" variant="standard" {...params} />
            )}
          />
          <TextField
            label="Purchased From"
            value={purchasedFrom}
            variant="standard"
            margin="normal"
            onChange={(event) => setPurchasedFrom(event.target.value)}
            fullWidth
          />
          <TextField
            label="Round Count"
            value={roundCount}
            variant="standard"
            type="number"
            margin="normal"
            onChange={handleRoundCountChange}
            fullWidth
          />
          <TextField
            label="Purchase Price"
            value={purchasePrice}
            variant="standard"
            type="number"
            margin="normal"
            onChange={handlePriceChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Price per Round"
            value={pricePerRound}
            variant="standard"
            type="number"
            margin="normal"
            onChange={(event) => setPricePerRound(event.target.value)}
            fullWidth
            disabled
            color="primary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
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
          <Redirect to={{ pathname: '/ammo', state: { savedAmmo: true } }} />
        )}
      </LocalizationProvider>
    </>
  );
}

export default AmmoItem;
