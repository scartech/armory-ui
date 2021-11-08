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
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme, styled } from '@mui/material/styles';
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
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  minHeight: 100,
  color: theme.palette.text.secondary,
}));

function GunPicker({
  selectedGunIds,
  setSelectedGunIds,
  roundsFired,
  setRoundsFired,
}) {
  const auth = useAuth();
  const classes = useStyles();
  const [dialogGunIds, setDialogGunIds] = useState([]);
  const [gunIds, setGunIds] = useState([]);
  const [guns, setGuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [gunRounds, setGunRounds] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setGunIds(selectedGunIds);
  }, [selectedGunIds]);

  useEffect(() => {
    setGunRounds(roundsFired);
  }, [roundsFired]);

  useEffect(() => {
    const gr = {};
    guns.forEach((gun) => {
      gr[gun.id] = gun.id in roundsFired ? roundsFired[gun.id] : 0;
    });

    setGunRounds(gr);
  }, [guns, roundsFired]);

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

  const handleRoundCountChange = (event, gunId) => {
    const value = parseInt(event.target.value);
    const gr = { ...gunRounds };
    gr[gunId] = !Number.isNaN(value) ? value : 0;
    setGunRounds(gr);
    setRoundsFired(gr);
  };

  const handleClose = () => {
    setSelectedGunIds(dialogGunIds);
    setOpen(false);

    const removedIds = Object.keys(gunRounds).filter(
      (x) => dialogGunIds.indexOf(parseInt(x)) === -1,
    );

    if (removedIds.length > 0) {
      const gr = { ...gunRounds };

      removedIds.forEach((gunId) => {
        gr[gunId] = 0;
      });

      setGunRounds(gr);
      setRoundsFired(gr);
    }
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
      {gunIds.length > 0 && (
        <>
          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
            {loading ? (
              <Item>
                <div className={classes.skeletonContainer}>
                  <Skeleton variant="rectangular" height={250} />
                </div>
              </Item>
            ) : (
              guns
                .filter((gun) => gunIds.indexOf(gun.id) !== -1)
                .map((gun) => (
                  <Grid key={gun.id} item xs={12} sm={12} md={6} lg={4}>
                    <Item key={gun.id} variant="outlined">
                      <Typography variant="caption">{gun.caliber}</Typography>
                      <Typography variant="subtitle1">{gun.name}</Typography>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        type="number"
                        value={gunRounds[gun.id] || 0}
                        onChange={(event) =>
                          handleRoundCountChange(event, gun.id)
                        }
                      />
                    </Item>
                  </Grid>
                ))
            )}
          </Grid>
        </>
      )}

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Select Guns</DialogTitle>
        <DialogContent>
          <Paper variant="elevation" elevation={0}>
            {guns.map((gun) => (
              <FormGroup key={gun.id}>
                <FormControlLabel
                  label={`${gun.name} (${gun.caliber})`}
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
  /* eslint-ensable react/jsx-curly-newline */
  /* eslint-enable implicit-arrow-linebreak */
}

GunPicker.propTypes = {
  selectedGunIds: PropTypes.array.isRequired,
  setSelectedGunIds: PropTypes.func.isRequired,
  roundsFired: PropTypes.object.isRequired,
  setRoundsFired: PropTypes.func.isRequired,
};

export default GunPicker;
