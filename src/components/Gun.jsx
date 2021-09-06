import {
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  title: {
    marginBottom: 15,
  },
}));

export function Gun({ gun }) {
  const classes = useStyles();

  console.log(gun);
  return (
    <Box pt={3}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.title}
          >
            {gun.name}
          </Typography>
          <Typography variant="body2">Model: {gun.modelName}</Typography>

          <TextField
            label="Model"
            defaultValue={gun.modelName || ' '}
            variant="outlined"
            fullWidth
            size="small"
          />
          <TextField
            label="Serial Number"
            defaultValue={gun.serialNumber || ' '}
            variant="outlined"
            fullWidth
            size="small"
          />
        </CardContent>
      </Card>
    </Box>
  );
}
