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
  TextField,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme, styled } from '@mui/material/styles';
import { AmmoInventoryService } from '../services';
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
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  minHeight: 100,
  color: theme.palette.text.secondary,
}));

function InventoryPicker({
  selectedIds,
  setSelectedIds,
  roundsFired,
  setRoundsFired,
}) {
  const auth = useAuth();
  const classes = useStyles();
  const [dialogInventoryIds, setDialogInventoryIds] = useState([]);
  const [inventoryIds, setInventoryIds] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [gunRounds, setGunRounds] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setInventoryIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    setGunRounds(roundsFired);
  }, [roundsFired]);

  useEffect(() => {
    const gr = {};
    inventories.forEach((inventory) => {
      gr[inventory.id] = 0;
    });

    setGunRounds(gr);
  }, [inventories]);

  useEffect(() => {
    async function fetchInventory() {
      const inventoriez = await AmmoInventoryService.all(auth.user);
      if (inventoriez) {
        setInventories(inventoriez);
      }

      setLoading(false);
    }

    fetchInventory();
  }, [auth.user]);

  const handleRoundCountChange = (event, inventory) => {
    const gr = { ...gunRounds };
    gr[inventory.id] = parseInt(event.target.value);
    setGunRounds(gr);
    setRoundsFired(gr);
  };

  const handleClose = () => {
    setSelectedIds(dialogInventoryIds);
    setOpen(false);

    const removedIds = Object.keys(gunRounds).filter(
      (x) => dialogInventoryIds.indexOf(parseInt(x)) === -1,
    );

    if (removedIds.length > 0) {
      const gr = { ...gunRounds };

      removedIds.forEach((inventoryId) => {
        gr[inventoryId] = 0;
      });

      setGunRounds(gr);
      setRoundsFired(gr);
    }
  };

  const handleChecked = (event) => {
    const inventoryId = parseInt(event.target.value);
    if (!Number.isNaN(inventoryId)) {
      if (event.target.checked) {
        setDialogInventoryIds([...dialogInventoryIds, inventoryId]);
      } else {
        setDialogInventoryIds(
          dialogInventoryIds.filter((x) => x !== inventoryId),
        );
      }
    }
  };

  const handleShowDialog = () => {
    setDialogInventoryIds([...inventoryIds]);
    setOpen(true);
  };

  /* eslint-disable implicit-arrow-linebreak */
  /* eslint-disable react/jsx-curly-newline */
  return (
    <div className={classes.root}>
      <Button
        onClick={handleShowDialog}
        variant="outlined"
        color="primary"
        size="small"
        className={classes.button}
      >
        Select
      </Button>
      {inventoryIds.length > 0 && (
        <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
          {loading ? (
            <>
              <Item>
                <div className={classes.skeletonContainer}>
                  <Skeleton variant="rectangular" height={250} />
                </div>
              </Item>
            </>
          ) : (
            inventories
              .filter((inventory) => inventoryIds.indexOf(inventory.id) !== -1)
              .map((inventory) => (
                <Grid key={inventory.id} item xs={12} sm={12} md={6} lg={4}>
                  <Item key={inventory.id} variant="outlined">
                    <Typography variant="caption">
                      {inventory.caliber}
                    </Typography>
                    <Typography variant="subtitle1">
                      {inventory.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {inventory.brand}
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      type="number"
                      value={gunRounds[inventory.id] || 0}
                      onChange={(event) =>
                        handleRoundCountChange(event, inventory)
                      }
                    />
                  </Item>
                </Grid>
              ))
          )}
        </Grid>
      )}
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Select Ammo</DialogTitle>
        <DialogContent>
          <Paper variant="elevation" elevation={0}>
            {inventories.map((inventory) => (
              <FormGroup key={inventory.id}>
                <FormControlLabel
                  label={`${inventory.name} (${inventory.caliber})`}
                  control={
                    <Checkbox
                      onClick={handleChecked}
                      value={inventory.id}
                      checked={dialogInventoryIds.indexOf(inventory.id) !== -1}
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
  /* eslint-ensable react/jsx-curly-newline */
  /* eslint-enable implicit-arrow-linebreak */
}

InventoryPicker.propTypes = {
  selectedIds: PropTypes.array.isRequired,
  setSelectedIds: PropTypes.func.isRequired,
  roundsFired: PropTypes.object.isRequired,
  setRoundsFired: PropTypes.func.isRequired,
};

export default InventoryPicker;
