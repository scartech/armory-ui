import React, { useState } from 'react';
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
import ListIcon from '@material-ui/icons/List';
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

function NavBar() {
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

  const handleLogout = (event) => {
    setAnchorEl(null);
    auth.signout();
    history.push('/login');
  };

  // Don't display the navbar util the user has logged in.
  if (!auth.user) {
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
            <ListIcon />
          </IconButton>
          <IconButton component={Link} to="/admin" color="inherit">
            <SettingsIcon />
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

export { NavBar };
