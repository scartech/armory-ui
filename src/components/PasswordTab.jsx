import { useState } from 'react';
import {
  Button,
  TextField,
  Snackbar,
  IconButton,
  Alert,
  InputAdornment,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
