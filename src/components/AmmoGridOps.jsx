import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import makeStyles from '@mui/styles/makeStyles';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles(() => ({
  mobileButton: {
    fontSize: '1.2rem',
  },
}));

function AmmoGridOps({ id }) {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleEditClick = () => {
    handleClose();
    history.push(`/ammo/item/${id}`);
  };

  return (
    <>
      <BrowserView>
        <IconButton size="small" onClick={handleOpClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem onClick={handleEditClick}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        </Menu>
      </BrowserView>
      <MobileView>
        <IconButton size="small" onClick={handleEditClick}>
          <EditIcon className={classes.mobileButton} />
        </IconButton>
      </MobileView>
    </>
  );
}

AmmoGridOps.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AmmoGridOps;
