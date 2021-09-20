import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  Snackbar,
  IconButton,
  Fab,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../hooks';
import { UserService } from '../services';
import { ROLES } from '../utils';

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

function User() {
  const auth = useAuth();
  const classes = useStyles();
  const { id } = useParams();

  const [isNew, setIsNew] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [role, setRole] = useState('USER');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await UserService.get(auth.user, id);
      if (user) {
        setEmail(user.email ?? '');
        setName(user.name ?? '');
        setEnabled(user.enabled ?? true);
        setRole(user.role ?? 'USER');
      }
    }

    const idIsNew = Boolean(id);
    setIsNew(!idIsNew);
    setUserId(id);

    if (idIsNew) {
      fetchUser();
    }
  }, [auth.user, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event, isNewUser) => {
    event.preventDefault();

    const data = {
      name,
      email,
      enabled,
      role,
    };

    setOpen(false);

    let user;
    if (isNewUser) {
      if (password !== passwordConfirm) {
        setSeverity('error');
        setMessage('Passwords do not match.');
        setOpen(true);
        return;
      }

      user = await UserService.create(auth.user, { ...data, password });
    } else {
      user = await UserService.update(auth.user, userId, data);
    }

    if (user) {
      setFireRedirect(true);
    } else {
      setSeverity('error');
      setMessage('Unable to save the user.');
      setOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Typography className={classes.title} variant="h4">
          {isNew ? 'New User' : 'Edit User'}
          <Link to="/admin">
            <Fab color="primary" className={classes.fab}>
              <ArrowBackIcon />
            </Fab>
          </Link>
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
            />
          }
          label="Enabled"
        />
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
        <TextField
          className={classes.text}
          label="Role"
          select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          fullWidth
        >
          {ROLES.map((roleType) => (
            <MenuItem key={roleType} value={roleType}>
              {roleType}
            </MenuItem>
          ))}
        </TextField>
        {isNew
          ? [
              <TextField
                className={classes.text}
                label="Password"
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
              />,
              <TextField
                className={classes.text}
                label="Confirm Password"
                value={passwordConfirm}
                type="password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
                fullWidth
              />,
            ]
          : null}

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
        <Redirect to={{ pathname: '/admin', state: { savedUser: true } }} />
      )}
    </>
  );
}

export default User;
