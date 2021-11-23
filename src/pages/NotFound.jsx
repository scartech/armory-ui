import { Typography, Alert, AlertTitle, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(1),
    textDecoration: 'none',
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h3">
        Whoops!
      </Typography>
      <Alert severity="error">
        <AlertTitle>It looks like we&apos;ve had a malfunction.</AlertTitle>
        The URL requested was not found.
      </Alert>
      <Link className={classes.button} to="/">
        <Button variant="text">Go Home</Button>
      </Link>
    </>
  );
}

export default NotFound;
