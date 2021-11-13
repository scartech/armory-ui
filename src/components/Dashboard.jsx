import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiPistol, mdiDotsHexagon } from '@mdi/js';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import DashboardCard from './DashboardCard';

const useStyles = makeStyles(() => ({
  graphCard: {
    width: '100%',
    height: 400,
    margin: 'auto',
    '& i': {
      fontSize: '25px',
    },
    backgroundColor: 'transparent',
  },
}));

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-US');
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard({ data }) {
  const [gunPieData, setGunPieData] = useState([]);
  const [ammoBarData, setAmmoBarData] = useState([]);

  useEffect(() => {
    setGunPieData([
      { name: 'Pistols', value: data.pistolCount, key: uuidv4() },
      { name: 'Rifles', value: data.rifleCount, key: uuidv4() },
      { name: 'Shotguns', value: data.shotgunCount, key: uuidv4() },
    ]);

    const ammoValues = [];
    if (Object.keys(data).length > 0) {
      Object.keys(data.ammoBreakdown).forEach((caliber) => {
        ammoValues.push({
          key: uuidv4(),
          value: data.ammoBreakdown[caliber],
          name: caliber,
        });
      });
    }

    setAmmoBarData(ammoValues);
  }, [data]);

  const ammoColumnChart = (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={ammoBarData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar key={uuidv4()} dataKey="value" fill={COLORS[0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const gunPieChart = (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie dataKey="value" data={gunPieData} label>
          {gunPieData.map((entry, index) => (
            <Cell key={`${entry.key}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const classes = useStyles();

  return (
    <Grid container spacing={4} padding={2}>
      <Grid item xs={12} lg={6}>
        <Card className={classes.graphCard} variant="elevation" elevation={1}>
          <Grid align="center">
            <CardContent>
              <Typography color="textSecondary" variant="h6">
                Gun Types
              </Typography>
              {gunPieChart}
            </CardContent>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card className={classes.graphCard} variant="outlined">
          <Grid align="center">
            <CardContent>
              <Typography color="textSecondary" variant="h6">
                Ammo in Stock
              </Typography>
              {ammoColumnChart}
            </CardContent>
          </Grid>
        </Card>
      </Grid>
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
          message={`${numberFormatter.format(data.totalRoundsPurchased)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Rounds Shot"
          icon={<i className="gi gi-ammo" />}
          message={`${numberFormatter.format(data.totalRoundsShot)}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <DashboardCard
          title="Rounds in Stock"
          icon={<i className="gi gi-ammo" />}
          message={`${numberFormatter.format(data.totalAmmoInStock)}`}
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
