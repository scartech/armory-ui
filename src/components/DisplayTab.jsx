import { useState, useEffect } from 'react';
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  IconButton,
  Alert,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import PubSub from 'pubsub-js';
import { useDarkMode } from '../hooks';

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  subMessage: {
    paddingLeft: theme.spacing(1),
    fontSize: '0.68rem',
  },
}));

function DisplayTab() {
  const classes = useStyles();
  const { isDark: sysDark } = useDarkMode();

  const [styleType, setStyleType] = useState('Auto');

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStyleType(localStorage.getItem('appearance') ?? 'Auto');
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setOpen(false);
    setSeverity('info');
    setMessage('Profile updated successfully.');

    localStorage.setItem('appearance', styleType);
    if (styleType === 'Auto') {
      PubSub.publish('THEME-CHANGE', { isDark: sysDark });
    } else {
      PubSub.publish('THEME-CHANGE', { isDark: styleType === 'Dark' });
    }

    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setStyleType(newValue);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Typography variant="subtitle1">
          Appearance
          <Typography variant="caption" className={classes.subMessage}>
            (applied to current browser only)
          </Typography>
        </Typography>
        <ToggleButtonGroup value={styleType} exclusive onChange={handleChange}>
          <ToggleButton value="Light" selected={styleType === 'Light'}>
            Light
          </ToggleButton>
          <ToggleButton value="Dark" selected={styleType === 'Dark'}>
            Dark
          </ToggleButton>
          <ToggleButton value="Auto" selected={styleType === 'Auto'}>
            Auto
          </ToggleButton>
        </ToggleButtonGroup>
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

export default DisplayTab;
