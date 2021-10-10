import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 150,
    margin: theme.spacing(2),
    '& i': {
      fontSize: '25px',
    },
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
    '& i': {
      fontSize: '30px',
    },
  },
}));

function DashboardCard({ title, icon, message }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="elevation" elevation={5}>
      <Grid align="center">
        <CardContent>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            {title}
          </Typography>
          <Avatar className={classes.largeAvatar}>{icon}</Avatar>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            {message}
          </Typography>
        </CardContent>
      </Grid>
    </Card>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default DashboardCard;
