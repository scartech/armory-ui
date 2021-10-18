import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import Icon from '@mdi/react';
import { mdiPistol } from '@mdi/js';
import DashboardCard from './DashboardCard';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-US');

function Dashboard({ data }) {
  return (
    <Grid container>
      <DashboardCard
        title="Total Guns"
        icon={<i className="gi gi-star" />}
        message={`${numberFormatter.format(data.gunCount)}`}
      />
      <DashboardCard
        title="Rifles"
        icon={<i className="gi gi-gun" />}
        message={`${numberFormatter.format(data.rifleCount)}`}
      />
      <DashboardCard
        title="Pistols"
        icon={<Icon path={mdiPistol} size={1.5} />}
        message={`${numberFormatter.format(data.pistolCount)}`}
      />
      <DashboardCard
        title="Rounds Purchased"
        icon={<i className="gi gi-ammo" />}
        message={`${numberFormatter.format(data.totalRoundCount)}`}
      />
      <DashboardCard
        title="Total Investment"
        icon={<i className="gi gi-usd" />}
        message={`${currencyFormatter.format(data.totalInvestment)}`}
      />
      <DashboardCard
        title="Total Gun Investment"
        icon={<i className="gi gi-usd" />}
        message={`${currencyFormatter.format(data.totalGunCost)}`}
      />
      <DashboardCard
        title="Total Ammo Investment"
        icon={<i className="gi gi-usd" />}
        message={`${currencyFormatter.format(data.totalAmmoCost)}`}
      />
    </Grid>
  );
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Dashboard;
