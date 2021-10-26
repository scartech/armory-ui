import PropTypes from 'prop-types';
import { TableContainer, Table, TableBody, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { v4 as uuidv4 } from 'uuid';
import MobileGridLineItem from './MobileGridLineItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
}));

function MobileGridItem({ data, columns }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table size="small">
        <TableBody>
          {columns.map((column) => (
            <MobileGridLineItem key={uuidv4()} data={data} column={column} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MobileGridItem.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};

export default MobileGridItem;
