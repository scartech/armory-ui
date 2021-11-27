import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth, useDarkMode } from '../hooks';
import whitelogo from '../assets/images/logo-white.png';
import colorlogo from '../assets/images/logo-color.png';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  logo: {
    height: '65px',
  },
  textboxMargin: {
    marginTop: theme.spacing(3),
  },
  buttonStyle: {
    margin: '20px 0',
  },
  paperStyle: {
    margin: '0px auto',
    marginTop: theme.spacing(9),
    backgroundColor: 'transparent',
  },
}));

function Login({ loginFailure }) {
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const [darkState, setDarkState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isDark: sysDark } = useDarkMode();

  useEffect(() => {
    const appearance = localStorage.getItem('appearance') ?? 'Auto';
    if (appearance === 'Auto') {
      setDarkState(sysDark);
    } else {
      setDarkState(appearance === 'Dark');
    }
  }, [sysDark]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await auth.signin(email, password);

    if (user) {
      history.replace(from);
    } else {
      loginFailure();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper elevation={0} className={classes.paperStyle}>
          <Grid align="center">
            <img
              src={darkState ? whitelogo : colorlogo}
              alt="Logo"
              className={classes.logo}
            />
          </Grid>
          <TextField
            label="Email Address"
            fullWidth
            required
            autoComplete="email"
            autoFocus
            className={classes.textboxMargin}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            autoComplete="current-password"
            variant="outlined"
            className={classes.textboxMargin}
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.buttonStyle}
            fullWidth
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
}

Login.propTypes = {
  loginFailure: PropTypes.func.isRequired,
};

export default Login;
