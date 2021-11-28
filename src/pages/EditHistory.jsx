import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  IconButton,
  Fab,
  Alert,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../hooks';
import { HistoryService } from '../services';
import { HISTORY_TYPES } from '../utils';

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

function EditHistory() {
  const auth = useAuth();
  const classes = useStyles();
  const { id, gunId } = useParams();

  const [isNew, setIsNew] = useState(true);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('Cleaning');
  const [roundCount, setRoundCount] = useState(0);
  const [eventDate, setEventDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [rangeDay, setRangeDay] = useState(false);

  const [fireRedirect, setFireRedirect] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      const history = await HistoryService.get(auth.user, id);
      if (history) {
        setRangeDay(history.type === 'Range Day');
        setNotes(history.notes ?? '');
        setType(history.type ?? '');
        setLocation(history.location ?? '');
        setEventDate(history.eventDate ?? null);

        if (history.guns) {
          const guns = history.guns.filter((x) => x.id === parseInt(gunId));
          if (guns.length === 1 && guns[0].HistoryGun) {
            setRoundCount(guns[0].HistoryGun.roundCount);
          }
        }
      }
    }

    setIsNew(!Boolean(id));

    if (Boolean(id)) {
      fetchHistory();
    }
  }, [auth.user, id, gunId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event, isNewHistory) => {
    event.preventDefault();

    const data = {
      roundCount,
      notes,
      type,
      eventDate: eventDate || null,
      gunIds: [gunId],
      inventoryIds: [],
      gunRoundsFired: {},
      inventoryRoundsFired: {},
    };

    setOpen(false);

    let history;
    if (isNewHistory) {
      history = await HistoryService.create(auth.user, data);
    } else {
      history = await HistoryService.update(auth.user, id, data);
    }

    if (history) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the history.');
      setOpen(true);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h5">
            {rangeDay && 'View Range Day'}
            {isNew && 'New Record'}
            {!isNew && !rangeDay && 'Edit Record'}
            <Link to={`/gun/${gunId}/record`}>
              <Fab color="primary" size="small" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Typography>
          {rangeDay ? (
            <TextField
              label="Type"
              value="Range Day"
              variant="outlined"
              margin="normal"
              fullWidth
              disabled
            />
          ) : (
            <TextField
              label="Type"
              select
              value={type}
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(event) => setType(event.target.value)}
            >
              {HISTORY_TYPES.filter((x) => x !== 'Range Day').map(
                (historyType) => (
                  <MenuItem key={historyType} value={historyType}>
                    {historyType}
                  </MenuItem>
                ),
              )}
            </TextField>
          )}
          {rangeDay && (
            <TextField
              label="Location"
              value={location}
              variant="outlined"
              margin="normal"
              fullWidth
              disabled={rangeDay}
            />
          )}
          <DatePicker
            clearable
            label="Date"
            value={eventDate}
            onChange={(date) => setEventDate(date)}
            format="MM/DD/yyyy"
            disabled={rangeDay}
            renderInput={(params) => (
              <TextField variant="outlined" margin="normal" {...params} />
            )}
          />
          {rangeDay && (
            <TextField
              label="Round Count"
              value={roundCount}
              type="number"
              variant="outlined"
              margin="normal"
              disabled={rangeDay}
              onChange={(event) => setRoundCount(event.target.value)}
              fullWidth
            />
          )}
          <TextField
            label="Notes"
            value={notes}
            variant="outlined"
            margin="normal"
            disabled={rangeDay}
            multiline
            onChange={(event) => setNotes(event.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={(event) => handleSubmit(event, isNew)}
            fullWidth
            color="primary"
            className={classes.button}
            disabled={rangeDay}
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
          <Redirect
            to={{
              pathname: `/gun/${gunId}/record`,
              state: { savedHistory: true },
            }}
          />
        )}
      </LocalizationProvider>
    </>
  );
}

export default EditHistory;
