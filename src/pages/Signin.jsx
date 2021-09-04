import { Login } from '../components';
import { IconButton, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { useState, Fragment } from 'react';

const Signin = ({ setToken }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const handleToken = (token) => {
    if (!token) {
      setSeverity('error');
      setMessage('Login failed!');
      setOpen(true);
      return;
    }

    setToken(token);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Login setToken={handleToken} />
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
};

export { Signin };
