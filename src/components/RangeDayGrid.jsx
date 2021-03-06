import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RangeDayGridOps from './RangeDayGridOps';
import DataGrid from './DataGrid';

const csvName = 'Range-Data.csv';

function RangeDayGrid({ data }) {
  const history = useHistory();

  const columns = [
    {
      selector: (row) => row.location,
      name: 'Location',
      sortable: true,
      reorder: true,
      field: 'location',
    },
    {
      selector: (row) => row.roundsShotCount,
      name: 'Total Rounds Shot',
      sortable: true,
      reorder: true,
      field: 'roundsShotCount',
    },
    {
      selector: (row) => row.ammoUsedCount,
      name: 'Total Ammo Used',
      sortable: true,
      reorder: true,
      field: 'ammoUsedCount',
    },
    {
      selector: (row) => row.eventDate,
      name: 'Date',
      sortable: true,
      reorder: true,
      field: 'eventDate',
    },
    {
      name: '',
      width: '40px',
      center: true,
      button: true,
      cell: (row) => <RangeDayGridOps key={row.id} id={row.id} />,
    },
  ];

  const handleRowDoublClicked = (item) => {
    history.push(`/rangeday/${item.id}`);
  };

  return (
    <DataGrid
      data={data}
      columns={columns}
      csvName={csvName}
      onRowDoubleClicked={handleRowDoublClicked}
    />
  );
}

RangeDayGrid.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RangeDayGrid;
