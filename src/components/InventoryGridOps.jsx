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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles(() => ({
  mobileButton: {
    fontSize: '1.2rem',
  },
}));

function InventoryGridOps({ id, handleDeleteClick, canDelete }) {
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
    history.push(`/inventory/item/${id}`);
  };

  const handleDeleteItemClick = () => {
    handleClose();
    handleDeleteClick(id);
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
          {canDelete && (
            <MenuItem onClick={handleDeleteItemClick}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </BrowserView>
      <MobileView>
        <IconButton size="small" onClick={handleEditClick}>
          <EditIcon className={classes.mobileButton} />
        </IconButton>
        {canDelete && (
          <IconButton size="small" onClick={handleDeleteItemClick}>
            <DeleteIcon className={classes.mobileButton} />
          </IconButton>
        )}
      </MobileView>
    </>
  );
}

InventoryGridOps.propTypes = {
  id: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default InventoryGridOps;
