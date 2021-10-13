import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@mui/material';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import VpnKeySharpIcon from '@mui/icons-material/VpnKeySharp';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
  textboxMargin: {
    marginTop: theme.spacing(2),
  },
  buttonStyle: {
    margin: '20px 0',
  },
  paperStyle: {
    padding: 20,
    height: '265px',
    width: 280,
    margin: '0px auto',
    marginTop: 40,
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
    '& i': {
      fontSize: '30px',
    },
  },
}));

function Login({ loginFailure }) {
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Grid>
        <Paper elevation={5} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.largeAvatar}>
              <i className="gi gi-dogtags" color="inherit" />
            </Avatar>
            <Typography variant="h5">Welcome to the Armory</Typography>
          </Grid>
          <TextField
            placeholder="Enter email"
            size="small"
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
            size="small"
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
}

Login.propTypes = {
  loginFailure: PropTypes.func.isRequired,
};

export default Login;
