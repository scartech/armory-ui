import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  TextField,
  Typography,
  makeStyles,
  Snackbar,
  IconButton,
  Fab,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../hooks';
import { ProfileService } from '../services';

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
  divider: {
    margin: theme.spacing(5),
  },
}));

function Profile() {
  const auth = useAuth();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const user = await ProfileService.get(auth.user, auth.user?.id);
      if (user) {
        setEmail(user.email ?? '');
        setName(user.name ?? '');
      }
    }

    fetchUser();
  }, [auth.user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      setSeverity('error');
      setMessage('Empty passwords are not allowed.');
      setOpen(true);
      return;
    }

    if (password !== passwordConfirm) {
      setSeverity('error');
      setMessage('Passwords do not match.');
      setOpen(true);
      return;
    }

    const success = await ProfileService.updatePassword(auth.user, {
      password,
    });
    if (success) {
      setSeverity('info');
      setMessage('Password updated successfully.');
      setPassword('');
      setPasswordConfirm('');
    } else {
      setSeverity('error');
      setMessage('Unable to update your password.');
    }

    setOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
    };

    setOpen(false);

    const user = await ProfileService.update(auth.user, data);
    if (user) {
      setEmail(user.email || '');
      setName(user.name || '');

      setSeverity('info');
      setMessage('Profile updated successfully.');
    } else {
      setSeverity('error');
      setMessage('Unable to update your profile.');
    }

    setOpen(true);
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Typography className={classes.title} variant="h4">
          User Profile
          <Link to="/">
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
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          required
        />
        <Button
          variant="contained"
          onClick={(event) => handleSubmit(event)}
          fullWidth
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
        <Divider variant="middle" className={classes.divider} />
        <Typography className={classes.title} variant="h4">
          Change Password
        </Typography>
        <TextField
          className={classes.text}
          label="Password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.text}
          label="Confirm Password"
          value={passwordConfirm}
          type="password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={(event) => handlePasswordSubmit(event)}
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
    </>
  );
}

export default Profile;
