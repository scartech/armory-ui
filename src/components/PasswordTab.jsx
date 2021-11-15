import { useState } from 'react';
import { Button, TextField, Snackbar, IconButton, Alert } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../hooks';
import { ProfileService } from '../services';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(2),
  },
}));

function PasswordTab() {
  const auth = useAuth();
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
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

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          label="Password"
          value={password}
          variant="outlined"
          type="password"
          margin="normal"
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          value={passwordConfirm}
          variant="outlined"
          type="password"
          margin="normal"
          onChange={(event) => setPasswordConfirm(event.target.value)}
          fullWidth
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
          <>
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PasswordTab;
