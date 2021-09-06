import { Typography, makeStyles } from '@material-ui/core';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

function Admin() {
  const auth = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3">
        Administration
      </Typography>
    </div>
  );
}

export { Admin };
