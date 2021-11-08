import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  IconButton,
  Fab,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../hooks';
import { HistoryService } from '../services';
import { GunPicker, InventoryPicker } from '../components';

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
  divider: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

function RangeDay() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();

  const [isNew, setIsNew] = useState(true);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [gunIds, setGunIds] = useState([]);
  const [roundsFired, setRoundsFired] = useState({});
  const [inventoryRoundsFired, setInventoryRoundsFired] = useState({});
  const [inventoryIds, setInventoryIds] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const [fireRedirect, setFireRedirect] = useState(false);

  //   useEffect(() => {
  //     console.log(roundsFired);
  //   }, [roundsFired]);

  useEffect(() => {
    async function fetchHistory() {
      const history = await HistoryService.get(auth.user, id);
      if (history) {
        setLocation(history.location ?? '');
        setNotes(history.notes ?? '');
        setEventDate(history.eventDate ?? null);
        setGunIds(history.guns.map((x) => x.id));
        setInventoryIds(history.inventories.map((x) => x.id));

        const rFired = {};
        history.guns.forEach((gun) => {
          rFired[gun.id] = gun?.HistoryGun?.roundCount ?? 0;
        });
        setRoundsFired(rFired);

        const iFired = {};
        history.inventories.forEach((inv) => {
          iFired[inv.id] = inv?.HistoryInventory?.roundCount ?? 0;
        });
        setInventoryRoundsFired(iFired);
      }
    }

    setIsNew(!Boolean(id));

    if (Boolean(id)) {
      fetchHistory();
    }
  }, [auth.user, id]);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleSubmit = async (event, isNewHistory) => {
    event.preventDefault();

    const data = {
      location,
      notes,
      type: 'Range Day',
      eventDate: eventDate || null,
      gunIds,
      inventoryIds,
      gunRoundsFired: roundsFired,
      inventoryRoundsFired,
    };

    setSnackOpen(false);

    let history;
    if (isNewHistory) {
      history = await HistoryService.createRangeDay(auth.user, data);
    } else {
      history = await HistoryService.update(auth.user, id, data);
    }

    if (history) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the range day.');
      setSnackOpen(true);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h5">
            {isNew ? 'New Range Day' : 'Edit Range Day'}
            <Link to="/rangedays">
              <Fab color="primary" size="small" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Typography>
          <TextField
            label="Location"
            value={location}
            variant="outlined"
            margin="normal"
            onChange={(event) => setLocation(event.target.value)}
            fullWidth
          />
          <DatePicker
            clearable
            label="Date"
            value={eventDate}
            onChange={(date) => setEventDate(date)}
            format="MM/DD/yyyy"
            renderInput={(params) => (
              <TextField variant="outlined" margin="normal" {...params} />
            )}
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
          <Divider className={classes.divider}>
            <Chip label="Guns Used" color="primary" />
          </Divider>
          <GunPicker
            selectedGunIds={gunIds}
            setSelectedGunIds={setGunIds}
            roundsFired={roundsFired}
            setRoundsFired={setRoundsFired}
          />
          <Divider className={classes.divider}>
            <Chip label="Ammo Used" color="primary" />
          </Divider>
          <InventoryPicker
            selectedIds={inventoryIds}
            setSelectedIds={setInventoryIds}
            roundsFired={inventoryRoundsFired}
            setRoundsFired={setInventoryRoundsFired}
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
          open={snackOpen}
          autoHideDuration={5000}
          onClose={() => setSnackOpen(false)}
          action={
            <Fragment>
              <IconButton
                size="small"
                color="inherit"
                onClick={handleSnackClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Fragment>
          }
        >
          <Alert onClose={handleSnackClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        {fireRedirect && (
          <Redirect
            to={{
              pathname: '/rangedays',
              state: { savedRangeDay: true },
            }}
          />
        )}
      </LocalizationProvider>
    </>
  );
}

export default RangeDay;
