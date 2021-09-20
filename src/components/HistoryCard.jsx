import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GunCardItem from './GunCardItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  media: {
    height: 180,
  },
  carousel: {
    margin: 0,
  },
}));

function HistoryCard({ gunId, history, handleDeleteClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">{history.name}</Typography>
          </Grid>
          <GunCardItem label="Type" value={history.type} />
          <GunCardItem label="Round Count" value={history.roundCount} />
          <GunCardItem label="Narrative" value={history.narrative} />
          <GunCardItem label="Date" value={history.eventDate} />
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/history/${gunId}/${history.id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleDeleteClick(`${history.id}`)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

HistoryCard.propTypes = {
  gunId: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default HistoryCard;
