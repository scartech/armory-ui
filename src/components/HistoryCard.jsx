import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
          {history.type === 'Range Day' && (
            <GunCardItem label="Round Count" value={history.roundsShotCount} />
          )}
          <GunCardItem label="Notes" value={history.notes} />
          <GunCardItem label="Date" value={history.eventDate} />
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/history/${gunId}/${history.id}`}>
          <IconButton size="large">
            <EditIcon />
          </IconButton>
        </Link>
        {history.type !== 'Range Day' && (
          <IconButton
            onClick={() => handleDeleteClick(`${history.id}`)}
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        )}
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
