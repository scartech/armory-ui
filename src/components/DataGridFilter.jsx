import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

function DataGridFilter({ filterText, onFilter, onClear }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        type="text"
        value={filterText}
        onChange={onFilter}
        size="small"
        label="Filter"
      />
      <Button className={classes.button} variant="text" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}

DataGridFilter.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default DataGridFilter;
