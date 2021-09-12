import { useState, useEffect, Fragment } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Fab,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { GunService } from '../services';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(3),
  },
}));

function Home() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [guns, setGuns] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gunId, setGunId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');

  const savedGun = location?.state?.savedGun || false;

  const handleDeleteClick = (id) => {
    setGunId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = (event) => {
    setDialogOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogCloseDelete = async (event) => {
    setDialogOpen(false);

    const deleted = await GunService.delete(auth.user, gunId);
    if (deleted) {
      setSnackMessage('Successfully deleted the gun.');
      setSnackSeverity('info');

      const gunz = await GunService.all(auth.user);
      if (gunz) {
        setGuns(gunz);
      }
    } else {
      setSnackMessage('Failed to delete the gun.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  useEffect(() => {
    async function fetchGuns() {
      const gunz = await GunService.all(auth.user);
      if (gunz) {
        setGuns(gunz);
      }
    }

    fetchGuns();
  }, [auth.user]);

  useEffect(() => {
    if (savedGun) {
      setSnackMessage('Successfully saved gun.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedGun]);

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Guns
        <Link to="/gun">
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Caliber</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guns.map((gun) => {
              return (
                <TableRow key={gun.id}>
                  <TableCell width={20}>
                    <Link to={`/gun/${gun.id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>{gun.name}</TableCell>
                  <TableCell>{gun.modelName}</TableCell>
                  <TableCell>{gun.serialNumber}</TableCell>
                  <TableCell>{gun.type}</TableCell>
                  <TableCell>{gun.action}</TableCell>
                  <TableCell>{gun.caliber}</TableCell>
                  <TableCell width={20}>
                    <IconButton onClick={() => handleDeleteClick(`${gun.id}`)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the gun?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        action={
          <Fragment>
            <IconButton size="small" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert onClose={handleSnackClose} severity={snackSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export { Home };
