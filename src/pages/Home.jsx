import { useState, useEffect, useContext, createContext } from 'react';
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
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { GunService } from '../services';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

function Home() {
  const auth = useAuth();
  const classes = useStyles();
  const [guns, setGuns] = useState([]);

  useEffect(() => {
    async function fetchGuns() {
      const gunz = await GunService.getGuns(auth.user);
      if (gunz) {
        setGuns(gunz);
      }
    }

    fetchGuns();
  }, [auth.user]);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3">
        Guns
      </Typography>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Caliber</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guns.map((gun) => {
              return (
                <TableRow key={gun.id}>
                  <TableCell>{gun.name}</TableCell>
                  <TableCell>{gun.modelName}</TableCell>
                  <TableCell>{gun.serialNumber}</TableCell>
                  <TableCell>{gun.type}</TableCell>
                  <TableCell>{gun.caliber}</TableCell>
                  <TableCell width={40}>
                    <Link to={`/gun/${gun.id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell width={40}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export { Home };
