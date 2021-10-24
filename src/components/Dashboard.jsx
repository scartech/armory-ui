import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import Icon from '@mdi/react';
import { mdiPistol, mdiDotsHexagon } from '@mdi/js';
import DashboardCard from './DashboardCard';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-US');

function Dashboard({ data }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Total Guns"
          icon={<i className="gi gi-star" />}
          message={`${numberFormatter.format(data.gunCount)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Rifles"
          icon={<i className="gi gi-gun" />}
          message={`${numberFormatter.format(data.rifleCount)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Pistols"
          icon={<Icon path={mdiPistol} size={1.5} />}
          message={`${numberFormatter.format(data.pistolCount)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Shotguns"
          icon={<Icon path={mdiDotsHexagon} size={1.5} />}
          message={`${numberFormatter.format(data.shotgunCount)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Rounds Purchased"
          icon={<i className="gi gi-ammo" />}
          message={`${numberFormatter.format(data.totalRoundCount)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Total Investment"
          icon={<i className="gi gi-usd" />}
          message={`${currencyFormatter.format(data.totalInvestment)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Gun Investment"
          icon={<i className="gi gi-usd" />}
          message={`${currencyFormatter.format(data.totalGunCost)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Ammo Investment"
          icon={<i className="gi gi-usd" />}
          message={`${currencyFormatter.format(data.totalAmmoCost)}`}
        />
      </Grid>
    </Grid>
  );
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Dashboard;
