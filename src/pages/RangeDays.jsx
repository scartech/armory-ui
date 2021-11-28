import { useState, useEffect } from 'react';
import {
  Container,
  Chip,
  Typography,
  IconButton,
  Fab,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
import { HistoryService } from '../services';
import { RangeDayGrid } from '../components';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(2),
  },
  container: {
    margin: 'auto',
  },
  count: {
    marginLeft: theme.spacing(1),
  },
  skeletonContainer: {
    marginBottom: theme.spacing(4),
  },
}));

function RangeDays() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [rangeDays, setRangeDays] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const savedRangeDay = location?.state?.savedRangeDay || false;

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  useEffect(() => {
    if (history.location.state && history.location.state.savedRangeDay) {
      const state = { ...history.location.state };
      delete state.savedRangeDay;
      history.replace({ ...history.location, state });
    }
  });

  useEffect(() => {
    async function fetchRangeDays() {
      const days = await HistoryService.rangeDays(auth.user);
      if (days) {
        setLoading(false);
        setRangeDays(days);
        setCount(days.length);
      }
    }

    fetchRangeDays();
  }, [auth.user]);

  useEffect(() => {
    if (savedRangeDay) {
      setSnackMessage('Successfully saved the range day.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedRangeDay]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography className={classes.title} variant="h5">
        Range Days
        <Chip size="medium" label={count} className={classes.count} />
        <Link to="/rangeday">
          <Fab color="primary" size="small" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <div>
        {loading ? (
          <>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
          </>
        ) : (
          <RangeDayGrid data={rangeDays} />
        )}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        action={
          <>
            <IconButton size="small" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleSnackClose} severity={snackSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default RangeDays;
