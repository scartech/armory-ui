import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 160,
    margin: 'auto',
    '& i': {
      fontSize: '25px',
    },
    backgroundColor: 'transparent',
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: theme.palette.secondary.main,
    '& i': {
      fontSize: '40px',
    },
  },
}));

function DashboardCard({ title, icon, message }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="elevation" elevation={1}>
      <Grid align="center">
        <CardContent>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            {title}
          </Typography>
          <Avatar className={classes.largeAvatar}>{icon}</Avatar>
          <Typography color="textSecondary" variant="h6" gutterBottom>
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
