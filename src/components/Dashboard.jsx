import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DashboardCard from './DashboardCard';

function Dashboard({ data }) {
  return (
    <Grid container>
      <DashboardCard
        title="Guns"
        icon={<i className="gi gi-gun" />}
        message={`${data.gunCount}`}
      />
      <DashboardCard
        title="Rounds Purchased"
        icon={<i className="gi gi-ammo" />}
        message={`${data.totalRoundCount}`}
      />
      <DashboardCard
        title="Total Gun Cost"
        icon={<i className="gi gi-usd" />}
        message={`$${data.totalGunCost}`}
      />
      <DashboardCard
        title="Total Ammo Cost"
        icon={<i className="gi gi-money" />}
        message={`$${data.totalAmmoCost}`}
      />
    </Grid>
  );
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Dashboard;
