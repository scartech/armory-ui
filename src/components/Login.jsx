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
  Container,
} from '@mui/material';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
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
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper elevation={0} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.largeAvatar}>
              <i className="gi gi-dogtags" color="inherit" />
            </Avatar>
            <Typography variant="h5">Welcome to the Armory</Typography>
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
