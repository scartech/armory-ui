import { useState } from 'react';
import PropTypes from 'prop-types';
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
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles(() => ({
  mobileButton: {
    fontSize: '1.2rem',
  },
}));

function InventoryGridOps({ id, handleDeleteClick, canDelete }) {
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

  const handleDeleteItemClick = () => {
    handleClose();
    handleDeleteClick(id);
  };

  return (
    <>
      {canDelete && (
        <>
          <BrowserView>
            <IconButton size="small" onClick={handleOpClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
              <MenuItem onClick={handleDeleteItemClick}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </BrowserView>
          <MobileView>
            <IconButton size="small" onClick={handleDeleteItemClick}>
              <DeleteIcon className={classes.mobileButton} />
            </IconButton>
          </MobileView>
        </>
      )}
    </>
  );
}

InventoryGridOps.propTypes = {
  id: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default InventoryGridOps;
