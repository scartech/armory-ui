import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { GiMachineGunMagazine } from 'react-icons/gi';
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
  accessoryIcon: {
    fontSize: '25px !important',
  },
  ammoIcon: {
    fontSize: '22px !important',
  },
  moneyIcon: {
    fontSize: '24px !important',
  },
}));

function MainDrawer() {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(false);
  };

  const handleMenuOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    toggleDrawer();
    auth.signout();
    history.push('/login');
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
          <ListItem
            button
            component={Link}
            to="/accessories"
            onClick={toggleDrawer}
          >
            <ListItemIcon>
              <GiMachineGunMagazine className={classes.accessoryIcon} />
            </ListItemIcon>
            <ListItemText primary="Accessories" />
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
              <i className={`${classes.moneyIcon} gi gi-usd`} />
            </ListItemIcon>
            <ListItemText primary="Ammo Purchases" />
          </ListItem>
          <ListItem button component={Link} to="/guns" onClick={toggleDrawer}>
            <ListItemIcon>
              <i className="gi gi-gun" />
            </ListItemIcon>
            <ListItemText primary="Guns" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/rangedays"
            onClick={toggleDrawer}
          >
            <ListItemIcon>
              <i className={`${classes.ammoIcon} gi gi-radar`} />
            </ListItemIcon>
            <ListItemText primary="Range Days" />
          </ListItem>
          <Divider />
          <ListItem
            button
            component={Link}
            to="/settings"
            onClick={toggleDrawer}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
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
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            </>
          )}
          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default MainDrawer;
