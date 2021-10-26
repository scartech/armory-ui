import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';

function MobileGridLineItem({ data, column }) {
  return (
    <TableRow>
      {column.isOp ? (
        <TableCell colSpan={2}>{column.render({ data })}</TableCell>
      ) : (
        <>
          <TableCell>{column.header}</TableCell>
          {column.hasRender ? (
            <TableCell>{column.render({ data })}</TableCell>
          ) : (
            <TableCell>{data[column.name]}</TableCell>
          )}
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
