import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import DataGrid from './DataGrid';

const gridStorageKey = 'rangedaygrid';
const csvName = 'Range-Data.csv';

function RangeDayGrid({ rangeDays }) {
  const columns = [
    {
      name: 'id',
      header: 'Ops',
      width: 60,
      sortable: false,
      draggable: false,
      isOp: true,
      render: (value) => [
        <Link to={`/rangeday/${value.data.id}`} key={uuidv4()}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>,
      ],
    },
    {
      name: 'location',
      header: 'Location',
      defaultFlex: 1,
    },
    {
      name: 'roundsShotCount',
      header: 'Total Rounds Shot',
      defaultFlex: 1,
    },
    {
      name: 'ammoUsedCount',
      header: 'Total Ammo Used',
      defaultFlex: 1,
    },
    {
      name: 'eventDate',
      header: 'Date',
      defaultFlex: 1,
    },
  ];

  return (
    <DataGrid
      data={rangeDays}
      columns={columns}
      storageKey={gridStorageKey}
      csvName={csvName}
    />
  );
}

RangeDayGrid.propTypes = {
  rangeDays: PropTypes.array.isRequired,
};

export default RangeDayGrid;
