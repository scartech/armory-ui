import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Typography,
  Snackbar,
  IconButton,
  Fab,
  Chip,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
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
    left: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  fabRight: {
    position: 'relative',
    left: theme.spacing(2),
  },
  fileInput: {
    display: 'none',
  },
  divider: {
    margin: theme.spacing(5),
  },
  count: {
    marginLeft: theme.spacing(1),
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [historyIdToDelete, setHistoryIdToDelete] = useState(null);

  const savedHistory = location?.state?.savedHistory || false;

  const handleDelete = async (id) => {
    setHistoryIdToDelete(id);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogCloseDelete = async () => {
    setDialogOpen(false);

    const deleted = await HistoryService.delete(auth.user, historyIdToDelete);

    if (deleted) {
      setMessage('Successfully deleted the record.');
      setSeverity('info');

      const events = await HistoryService.allForGun(auth.user, gunId);
      if (events) {
        setHistory(events);
      }
    } else {
      setMessage('Failed to delete the record.');
      setSeverity('error');
    }

    setOpen(true);
  };

  useEffect(() => {
    async function fetchGun() {
      const gun = await GunService.get(auth.user, gunId);
      if (gun) {
        setName(gun.name);
      }
    }

    async function fetchHistory() {
      const entries = await HistoryService.allForGun(auth.user, gunId);
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
      setMessage('Successfully saved the record.');
      setSeverity('info');
      setOpen(true);
    }
  }, [savedHistory]);

  return (
    <>
      <div>
        <Typography className={classes.title} variant="h5">
          {name}
          <Chip
            size="medium"
            label={history.length}
            className={classes.count}
          />
          <Link to="/guns">
            <Fab color="primary" size="small" className={classes.fab}>
              <ArrowBackIcon />
            </Fab>
          </Link>
          <Link to={`/history/${gunId}`}>
            <Fab color="primary" size="small" className={classes.fabRight}>
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
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default History;
