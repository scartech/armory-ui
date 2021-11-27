import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import DataGrid from './DataGrid';
import GunGridOps from './GunGridOps';

const csvName = 'Gun-Data.csv';

function GunGrid({ guns, handleDeleteClick }) {
  const history = useHistory();

  const columns = [
    {
      selector: (row) => row.name,
      name: 'Name',
      sortable: true,
      reorder: true,
      field: 'name',
    },
    {
      selector: (row) => row.manufacturer,
      name: 'Manufacturer',
      sortable: true,
      reorder: true,
      field: 'manufacturer',
    },
    {
      selector: (row) => row.modelName,
      name: 'Model',
      sortable: true,
      reorder: true,
      field: 'modelName',
    },
    {
      selector: (row) => row.serialNumber,
      name: 'Serial Number',
      sortable: true,
      reorder: true,
      field: 'serialNumber',
    },
    {
      selector: (row) => row.type,
      name: 'Type',
      sortable: true,
      reorder: true,
      field: 'type',
    },
    {
      selector: (row) => row.action,
      name: 'Action',
      sortable: true,
      reorder: true,
      field: 'action',
    },
    {
      selector: (row) => row.caliber,
      name: 'Caliber',
      sortable: true,
      reorder: true,
      field: 'caliber',
    },
    {
      selector: (row) => row.lastShot,
      name: 'Last Shot',
      sortable: true,
      reorder: true,
      field: 'lastShot',
    },
    {
      selector: (row) => row.roundsShotCount,
      name: 'Total Rounds Shot',
      sortable: true,
      reorder: true,
      field: 'roundsShotCount',
    },
    {
      name: '',
      width: '40px',
      center: true,
      button: true,
      cell: (row) => (
        <GunGridOps
          key={row.id}
          id={row.id}
          handleDeleteClick={handleDeleteClick}
        />
      ),
    },
  ];

  const handleRowDoubleClicked = (gun) => {
    history.push(`/gun/${gun.id}`);
  };

  return (
    <DataGrid
      data={guns}
      columns={columns}
      onRowDoubleClicked={handleRowDoubleClicked}
      csvName={csvName}
    />
  );
}

GunGrid.propTypes = {
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunGrid;
