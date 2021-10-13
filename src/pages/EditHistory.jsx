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

function EditHistory() {
  const auth = useAuth();
  const classes = useStyles();
  const { id, gunId } = useParams();

  const [isNew, setIsNew] = useState(true);
  const [name, setName] = useState('');
  const [narrative, setNarrative] = useState('');
  const [type, setType] = useState('Range Day');
  const [roundCount, setRoundCount] = useState(0);
  const [eventDate, setEventDate] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const [fireRedirect, setFireRedirect] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      const history = await HistoryService.get(auth.user, gunId, id);
      if (history) {
        setName(history.name ?? '');
        setNarrative(history.narrative ?? '');
        setRoundCount(history.roundCount ?? 0);
        setType(history.type ?? '');
        setEventDate(history.eventDate ?? null);
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
      name,
      roundCount,
      narrative,
      type,
      eventDate: eventDate || null,
    };

    setOpen(false);

    let history;
    if (isNewHistory) {
      history = await HistoryService.create(auth.user, gunId, data);
    } else {
      history = await HistoryService.update(auth.user, gunId, id, data);
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
          <Typography className={classes.title} variant="h4">
            {isNew ? 'New History' : 'Edit History'}
            <Link to={`/gun/${gunId}/history`}>
              <Fab color="primary" className={classes.fab}>
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Typography>
          <TextField
            className={classes.text}
            label="Type"
            select
            value={type}
            variant="standard"
            onChange={(event) => setType(event.target.value)}
            fullWidth
          >
            {HISTORY_TYPES.map((historyType) => (
              <MenuItem key={historyType} value={historyType}>
                {historyType}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.text}
            label="Name"
            value={name}
            variant="standard"
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <DatePicker
            clearable
            label="Date"
            value={eventDate}
            onChange={(date) => setEventDate(date)}
            format="MM/DD/yyyy"
            renderInput={(params) => (
              <TextField
                className={classes.text}
                variant="standard"
                {...params}
              />
            )}
          />
          <TextField
            className={classes.text}
            label="Round Count"
            value={roundCount}
            type="number"
            variant="standard"
            onChange={(event) => setRoundCount(event.target.value)}
            fullWidth
          />
          <TextField
            className={classes.text}
            label="Narrative"
            value={narrative}
            variant="standard"
            onChange={(event) => setNarrative(event.target.value)}
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
              pathname: `/gun/${gunId}/history`,
              state: { savedHistory: true },
            }}
          />
        )}
      </LocalizationProvider>
    </>
  );
}

export default EditHistory;
