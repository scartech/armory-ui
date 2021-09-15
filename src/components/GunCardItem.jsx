import { Typography, Grid } from '@material-ui/core';

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

export { GunCardItem };
