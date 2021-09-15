import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GunCardItem } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  media: {
    height: 180,
  },
}));

function GunCard({ gun, handleDeleteClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/640/360"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">{gun.name}</Typography>
          </Grid>
          <GunCardItem label="Manufacturer" value={gun.manufacturer} />
          <GunCardItem label="Model" value={gun.modelName} />
          <GunCardItem label="Serial Number" value={gun.serialNumber} />
          <GunCardItem label="Type" value={gun.type} />
          <GunCardItem label="Action" value={gun.action} />
          <GunCardItem label="Caliber" value={gun.caliber} />
          <GunCardItem label="Dealer" value={gun.dealer} />
          <GunCardItem label="FFL" value={gun.ffl} />
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/gun/${gun.id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleDeleteClick(`${gun.id}`)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export { GunCard };
