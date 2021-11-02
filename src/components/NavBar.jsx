import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
import MainDrawer from './MainDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  appbar: {
    height: '50px',
    justifyContent: 'center',
  },
}));

function NavBar({ handleThemeChange, darkState }) {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const divRef = React.useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    auth.signout();
    history.push('/login');
  };

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
          <Typography variant="h4" className={classes.title}>
            Armory
          </Typography>
          <IconButton onClick={handleThemeChange} size="large" color="inherit">
            {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            onClick={handleClick}
            ref={divRef}
            size="large"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

NavBar.propTypes = {
  handleThemeChange: PropTypes.func.isRequired,
  darkState: PropTypes.bool.isRequired,
};

export default NavBar;
