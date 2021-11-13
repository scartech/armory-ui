import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';

function DataGridFilter({ filterText, onFilter, onClear }) {
  return (
    <>
      <TextField
        type="text"
        value={filterText}
        onChange={onFilter}
        size="small"
        label="Filter"
      />
      <Button variant="text" onClick={onClear}>
        Clear
      </Button>
    </>
  );
}

DataGridFilter.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default DataGridFilter;
