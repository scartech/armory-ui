import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.title}>
            Armory
          </Typography>
          <IconButton component={Link} to="/" color="inherit">
            <HomeIcon />
          </IconButton>
          {auth.user.role === 'ADMIN' && (
            <IconButton component={Link} to="/admin" color="inherit">
              <SettingsIcon />
            </IconButton>
          )}
          <IconButton onClick={handleThemeChange} color="inherit">
            {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleClick} ref={divRef}>
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
