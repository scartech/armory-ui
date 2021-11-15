import { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, IconButton, Alert } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../hooks';
import { ProfileService } from '../services';

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

function ProfileTab() {
  const auth = useAuth();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
        <TextField
          label="Name"
          value={name}
          variant="outlined"
          margin="normal"
          onChange={(event) => setName(event.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={email}
          variant="outlined"
          margin="normal"
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

export default ProfileTab;
