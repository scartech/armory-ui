import { useState, useEffect, Fragment } from 'react';
import {
  Checkbox,
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
import { UserService } from '../services';

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

function Admin() {
  const auth = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('error');
  const [snackMessage, setSnackMessage] = useState('');

  const savedUser = location?.state?.savedUser || false;

  const handleDeleteClick = (id) => {
    setUserId(id);
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

    const deleted = await UserService.delete(auth.user, userId);
    if (deleted) {
      setSnackMessage('Successfully deleted the user.');
      setSnackSeverity('info');

      const userz = await UserService.all(auth.user);
      if (userz) {
        setUsers(userz);
      }
    } else {
      setSnackMessage('Failed to delete the user.');
      setSnackSeverity('error');
    }

    setSnackOpen(true);
  };

  useEffect(() => {
    async function fetchUsers() {
      const userz = await UserService.all(auth.user);
      if (userz) {
        setUsers(userz);
      }
    }

    fetchUsers();
  }, [auth.user]);

  useEffect(() => {
    if (savedUser) {
      setSnackMessage('Successfully saved user.');
      setSnackSeverity('info');
      setSnackOpen(true);
    }
  }, [savedUser]);

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Administration
        <Link to="/user">
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Typography>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Checkbox disabled checked={user.enabled} />
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell width={40}>
                    <Link to={`/user/${user.id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell width={40}>
                    <IconButton onClick={() => handleDeleteClick(`${user.id}`)}>
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
            Are you sure you want to delete the user?
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

export { Admin };
