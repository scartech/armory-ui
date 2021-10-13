import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';

function GunCardItem({ label, value }) {
  return (
    <>
      <Grid item xs={3}>
        <Typography variant="caption">{label}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle2">{value}</Typography>
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
