import { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  textboxMargin: {
    marginTop: theme.spacing(3),
  },
  buttonStyle: {
    margin: '30px 0',
  },
  paperStyle: {
    padding: 20,
    height: '250px',
    width: 280,
    margin: '20px auto',
  },
}));

const loginUser = async (credentials) => {
  try {
    const res = await axios.post('http://localhost:5000/login', credentials);
    return res.data.token;
  } catch (error) {
    console.log('Login failed', error.response);
    return undefined;
  }
};

const Login = ({ setToken }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await loginUser({
      email,
      password,
    });

    setToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper elevation={5} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar>
              <LockSharpIcon />
            </Avatar>
            <Typography variant="h5">Welcome to the Armory</Typography>
          </Grid>
          <TextField
            placeholder="Enter email"
            fullWidth
            required
            className={classes.textboxMargin}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailSharpIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            className={classes.textboxMargin}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeySharpIcon />
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
      </Grid>
    </form>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export { Login };
