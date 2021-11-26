import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Redirect } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useAuth, useDarkMode } from '../hooks';
import whitelogo from '../assets/images/logo-white.png';
import colorlogo from '../assets/images/logo-color.png';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  boxMargin: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  buttonStyle: {
    margin: '20px 0',
  },
  paperStyle: {
    margin: '0px auto',
    marginTop: theme.spacing(9),
    backgroundColor: 'transparent',
  },
  logo: {
    height: '65px',
  },
  totpInput: {
    fontSize: '2em',
    borderRadius: '4px',
    height: '2rem',
    width: '2rem !important',
    border: '1px solid rbga(0, 0, 0, 0,3)',
  },
  totpInputContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function LoginMFA() {
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [darkState, setDarkState] = useState(false);
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);

  const { isDark: sysDark } = useDarkMode();

  useEffect(() => {
    const appearance = localStorage.getItem('appearance') ?? 'Auto';
    if (appearance === 'Auto') {
      setDarkState(sysDark);
    } else {
      setDarkState(appearance === 'Dark');
    }
  }, [sysDark]);

  const handleCodeChange = async (value) => {
    setCode(value);

    if (value.length === 6) {
      const user = await auth.signinTotp(value, rememberMe, auth.user.id);
      if (user) {
        history.replace(from);
      } else {
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    auth.signout();
    history.push('/login');
  };

  if (!auth?.user) {
    // The user is not logged in
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper elevation={0} className={classes.paperStyle}>
          <Grid align="center">
            <img
              src={darkState ? whitelogo : colorlogo}
              alt="Logo"
              className={classes.logo}
            />
          </Grid>
          <Grid align="center" className={classes.boxMargin}>
            <Typography variant="subtitle1">Enter verification code</Typography>
          </Grid>
          <Box>
            <OtpInput
              containerStyle={classes.totpInputContainer}
              inputStyle={classes.totpInput}
              value={code}
              onChange={handleCodeChange}
              numInputs={6}
              isInputNum
              shouldAutoFocus
            />
          </Box>
          <Grid align="center" className={classes.boxMargin}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={rememberMe}
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                }
                label="Trust this Device"
              />
            </FormGroup>
          </Grid>
          <Grid align="center" className={classes.boxMargin}>
            <Button color="primary" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Paper>
      </Container>
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
        <Alert onClose={handleClose} severity="error">
          Validation failed.
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginMFA;
