import { useState, useEffect } from 'react';
import { Container, Typography, Skeleton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useAuth } from '../hooks';
import { DashboardService } from '../services';
import { Dashboard } from '../components';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  container: {
    margin: 'auto',
  },
  count: {
    marginLeft: theme.spacing(1),
  },
  skeletonContainer: {
    marginBottom: theme.spacing(4),
  },
}));

function Home() {
  const auth = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchAmmo() {
      const dashboardData = await DashboardService.data(auth.user);
      if (dashboardData) {
        setLoading(false);
        setData(dashboardData);
      }
    }

    fetchAmmo();
  }, [auth.user]);

  return (
    <Container maxWidth="xl">
      <Typography className={classes.title} variant="h5">
        Dashboard
      </Typography>
      <div className={classes.container}>
        {loading ? (
          <>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
            <div className={classes.skeletonContainer}>
              <Skeleton variant="rectangular" height={250} />
            </div>
          </>
        ) : (
          <Dashboard data={data} />
        )}
      </div>
    </Container>
  );
}

export default Home;
