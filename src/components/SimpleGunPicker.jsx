import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Skeleton,
  Checkbox,
  Paper,
  Grid,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { GunService } from '../services';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  skeletonContainer: {
    marginBottom: theme.spacing(4),
  },
  cell: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  list: {
    background: 'transparent',
    minWidth: '200px',
  },
}));

function SimpleGunPicker({
  selectedGunIds,
  setSelectedGunIds,
  handleItemDelete,
}) {
  const auth = useAuth();
  const classes = useStyles();
  const [dialogGunIds, setDialogGunIds] = useState([]);
  const [gunIds, setGunIds] = useState([]);
  const [guns, setGuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setGunIds(selectedGunIds);
  }, [selectedGunIds]);

  useEffect(() => {
    async function fetchGuns() {
      const gunz = await GunService.all(auth.user);
      if (gunz) {
        setGuns(gunz);
      }

      setLoading(false);
    }

    fetchGuns();
  }, [auth.user]);

  const handleClose = () => {
    setSelectedGunIds(dialogGunIds);
    setOpen(false);
  };

  const handleChecked = (event) => {
    const gunId = parseInt(event.target.value);
    if (!Number.isNaN(gunId)) {
      if (event.target.checked) {
        setDialogGunIds([...dialogGunIds, gunId]);
      } else {
        setDialogGunIds(dialogGunIds.filter((x) => x !== gunId));
      }
    }
  };

  const handleShowDialog = () => {
    setDialogGunIds([...gunIds]);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={handleShowDialog}
        variant="outlined"
        color="primary"
        size="small"
        className={classes.button}
      >
        Select Guns
      </Button>
      {gunIds.length > 0 && (
        <>
          <Grid item xs={12} md={4}>
            <List dense>
              {loading ? (
                <ListItem>
                  <div className={classes.skeletonContainer}>
                    <Skeleton variant="rectangular" height={250} />
                  </div>
                </ListItem>
              ) : (
                guns
                  .filter((gun) => gunIds.indexOf(gun.id) !== -1)
                  .map((gun) => (
                    <ListItem
                      key={gun.id}
                      secondaryAction={
                        <IconButton
                          edge="start"
                          onClick={() => handleItemDelete(gun.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={gun.name} />
                    </ListItem>
                  ))
              )}
            </List>
          </Grid>
        </>
      )}

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Select Guns</DialogTitle>
        <DialogContent>
          <Paper variant="elevation" elevation={0} className={classes.list}>
            {guns.map((gun) => (
              <FormGroup key={gun.id}>
                <FormControlLabel
                  label={`${gun.name}`}
                  control={
                    <Checkbox
                      onClick={handleChecked}
                      value={gun.id}
                      checked={dialogGunIds.indexOf(gun.id) !== -1}
                    />
                  }
                />
              </FormGroup>
            ))}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus disabled={loading}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SimpleGunPicker.propTypes = {
  selectedGunIds: PropTypes.array.isRequired,
  setSelectedGunIds: PropTypes.func.isRequired,
  handleItemDelete: PropTypes.func.isRequired,
};

export default SimpleGunPicker;
