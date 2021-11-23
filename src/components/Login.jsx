import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Button, Container } from '@mui/material';
import { useAuth, useDarkMode } from '../hooks';
import whitelogo from '../assets/images/logo-white.png';
import blacklogo from '../assets/images/logo-black.png';

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

  return (
    <form onSubmit={handleSubmit}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper elevation={0} className={classes.paperStyle}>
          <Grid align="center">
            <img
              src={darkState ? whitelogo : blacklogo}
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
            type="password"
            fullWidth
            required
            autoComplete="current-password"
            variant="outlined"
            className={classes.textboxMargin}
            onChange={(e) => setPassword(e.target.value)}
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
