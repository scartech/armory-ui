import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Typography,
  makeStyles,
  Snackbar,
  IconButton,
  Fab,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { useAuth } from '../hooks';
import { GunService, HistoryService } from '../services';
import { HistoryCard } from '../components';

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
    marginRight: theme.spacing(3),
  },
  fileInput: {
    display: 'none',
  },
  divider: {
    margin: theme.spacing(5),
  },
}));

function History() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();

  const { gunId } = useParams();
  const [name, setName] = useState('');
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const savedHistory = location?.state?.savedHistory || false;

  const handleDelete = async (id) => {
    const deleted = await HistoryService.delete(auth.user, gunId, id);
    if (deleted) {
      setMessage('Successfully deleted the history.');
      setSeverity('info');

      const events = await HistoryService.all(auth.user, gunId);
      if (events) {
        setHistory(events);
      }
    } else {
      setMessage('Failed to delete the gun.');
      setSeverity('error');
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchGun() {
      const gun = await GunService.get(auth.user, gunId);
      if (gun) {
        setName(gun.name);
      }
    }

    async function fetchHistory() {
      const entries = await HistoryService.all(auth.user, gunId);
      if (entries) {
        setHistory(entries);
      }
    }

    if (Boolean(gunId)) {
      fetchGun();
      fetchHistory();
    }
  }, [auth.user, gunId]);

  useEffect(() => {
    if (savedHistory) {
      setMessage('Successfully saved history.');
      setSeverity('info');
      setOpen(true);
    }
  }, [savedHistory]);

  return (
    <>
      <div>
        <Typography className={classes.title} variant="h4">
          {name}
          <Link to="/">
            <Fab color="primary" className={classes.fab}>
              <ArrowBackIcon />
            </Fab>
          </Link>
          <Link to={`/history/${gunId}`}>
            <Fab color="primary" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Link>
        </Typography>
        {history.length > 0 &&
          history.map((item) => (
            <HistoryCard
              key={item.id}
              history={item}
              gunId={parseInt(gunId)}
              handleDeleteClick={handleDelete}
            />
          ))}
        {history.length === 0 && (
          <Typography variant="h5">No events created yet.</Typography>
        )}
      </div>
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

export default History;
