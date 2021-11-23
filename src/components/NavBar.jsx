import { AppBar, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useAuth } from '../hooks';
import MainDrawer from './MainDrawer';
import logo from '../assets/images/logo-white.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    height: '40px',
    marginLeft: theme.spacing(2),
  },
  appbar: {
    height: '50px',
    justifyContent: 'center',
  },
}));

function NavBar() {
  const auth = useAuth();
  const classes = useStyles();

  // Don't display the navbar until the user has logged in.
  if (!auth?.user) {
    return <></>;
  }

  if (
    auth?.user?.totpValidated &&
    auth?.user?.totpEnabled &&
    !auth?.user?.totpLoggedIn
  ) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <MainDrawer />
          <img src={logo} alt="Logo" className={classes.title} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
