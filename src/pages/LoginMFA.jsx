import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router';
import {
  Grid,
  Paper,
  Avatar,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Redirect } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  boxMargin: {
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
  totpInput: {
    fontSize: '2em',
    borderRadius: '4px',
    margin: '0 1rem',
    height: '2rem',
    width: '2rem !important',
    border: '1px solid rbga(0, 0, 0, 0,3)',
  },
  totpInputContainer: {
    marginTop: '10px',
    marginBottom: '10px',
  },
}));

function LoginMFA() {
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);

  const handleCodeChange = async (value) => {
    setCode(value);

    if (value.length === 6) {
      const user = await auth.signinTotp(value, auth.user.id);
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
            <Avatar className={classes.largeAvatar}>
              <i className="gi gi-dogtags" color="inherit" />
            </Avatar>
            <Typography variant="h5">Welcome to the Armory</Typography>
          </Grid>
          <Grid align="center" className={classes.boxMargin}>
            <Typography variant="subtitle1">Enter verification code</Typography>
          </Grid>
          <Box className={classes.totpInputContainer}>
            <OtpInput
              inputStyle={classes.totpInput}
              value={code}
              onChange={handleCodeChange}
              numInputs={6}
              isInputNum
              shouldAutoFocus
            />
          </Box>
          <Grid align="center" className={classes.boxMargin}>
            <Button color="primary" onClick={handleLogout}>
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
