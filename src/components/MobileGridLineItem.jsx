import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';

function MobileGridLineItem({ data, column }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (column.cell) {
      setValue(column.cell(data));
    } else if (column.format) {
      setValue(column.format(data));
    } else if (column.selector) {
      setValue(column.selector(data));
    }
  }, [column, data]);

  return (
    <TableRow>
      {column.isOp ? (
        <TableCell colSpan={2}>{column.render({ data })}</TableCell>
      ) : (
        <>
          <TableCell>{column.name}</TableCell>
          <TableCell>{value}</TableCell>
        </>
      )}
    </TableRow>
  );
}

MobileGridLineItem.propTypes = {
  data: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
};

export default MobileGridLineItem;
