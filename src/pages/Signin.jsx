import { useState, Fragment } from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Login } from '../components';

function Signin() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const handleLoginFailure = () => {
    setSeverity('error');
    setMessage('Login failed!');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Login loginFailure={handleLoginFailure} />
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

export default Signin;
