import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
    '& i': {
      fontSize: '30px',
    },
  },
  fullList: {
    width: 'auto',
  },
}));

function MainDrawer() {
  const auth = useAuth();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(false);
  };

  const handleMenuOpen = () => {
    setOpen(!open);
  };

  // Don't display the navbar until the user has logged in.
  if (!auth?.user) {
    return <></>;
  }

  return (
    <>
      <Button color="inherit" onClick={handleMenuOpen}>
        <MenuIcon />
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List className={classes.list}>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/guns" onClick={toggleDrawer}>
            <ListItemIcon>
              <i className="gi gi-gun" />
            </ListItemIcon>
            <ListItemText primary="Guns" />
          </ListItem>
          <ListItem button component={Link} to="/ammo" onClick={toggleDrawer}>
            <ListItemIcon>
              <i className="gi gi-ammo" />
            </ListItemIcon>
            <ListItemText primary="Ammo" />
          </ListItem>
          {auth.user.role === 'ADMIN' && (
            <>
              <Divider />
              <ListItem
                button
                component={Link}
                to="/admin"
                onClick={toggleDrawer}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default MainDrawer;
