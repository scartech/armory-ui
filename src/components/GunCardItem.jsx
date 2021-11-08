import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Typography, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  clamp: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    color: theme.palette.text.secondary,
  },
  text: {
    color: theme.palette.text.secondary,
  },
}));

function GunCardItem({ label, value }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3}>
        <Typography variant="caption" className={classes.text}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2" className={classes.clamp}>
          {value}
        </Typography>
      </Grid>
    </>
  );
}

GunCardItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
};

GunCardItem.defaultProps = {
  value: '',
};

export default GunCardItem;
