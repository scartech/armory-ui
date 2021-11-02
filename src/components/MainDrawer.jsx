import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
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
  ammoIcon: {
    fontSize: '25px !important',
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
          <ListItem
            button
            component={Link}
            to="/inventory"
            onClick={toggleDrawer}
          >
            <ListItemIcon>
              <i className={`${classes.ammoIcon} gi gi-ammo`} />
            </ListItemIcon>
            <ListItemText primary="Ammo Inventory" />
          </ListItem>
          <ListItem button component={Link} to="/ammo" onClick={toggleDrawer}>
            <ListItemIcon>
              <i className={`${classes.ammoIcon} gi gi-usd`} />
            </ListItemIcon>
            <ListItemText primary="Ammo Purchases" />
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
