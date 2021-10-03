import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  InputAdornment,
  Snackbar,
  IconButton,
  Fab,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MomentUtils from '@date-io/moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../hooks';
import { AmmoService } from '../services';

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(2),
  },
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

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h4">
            {isNew ? 'New Ammo' : 'Edit Ammo'}
            <Link to="/ammo">
              <Fab color="primary" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
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
            label="Brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            fullWidth
          />
          <TextField
            className={classes.text}
            label="Caliber"
            value={caliber}
            onChange={(event) => setCaliber(event.target.value)}
            fullWidth
          />
          <TextField
            className={classes.text}
            label="Round Count"
            value={roundCount}
            type="number"
            onChange={(event) => setRoundCount(event.target.value)}
            fullWidth
          />
          <TextField
            className={classes.text}
            label="Weight"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            fullWidth
          />
          <TextField
            className={classes.text}
            label="Bullet Type"
            value={bulletType}
            onChange={(event) => setBulletType(event.target.value)}
            fullWidth
          />
          <TextField
            className={classes.text}
            label="Muzzle Velocity"
            value={muzzleVelocity}
            onChange={(event) => setMuzzleVelocity(event.target.value)}
            fullWidth
          />
          <KeyboardDatePicker
            className={classes.text}
            clearable
            label="Purchase Date"
            value={purchaseDate}
            onChange={(date) => setPurchaseDate(date)}
            format="MM/DD/yyyy"
            minDate={new Date()}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.text}
            label="Purchased From"
            value={purchasedFrom}
            onChange={(event) => setPurchasedFrom(event.target.value)}
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.text}
            label="Price per Round"
            value={pricePerRound}
            type="number"
            onChange={(event) => setPricePerRound(event.target.value)}
            fullWidth
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
      </MuiPickersUtilsProvider>
    </>
  );
}

export default AmmoItem;
