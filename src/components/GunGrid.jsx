import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function GunGrid({ guns, handleDeleteClick }) {
  const columns = [
    {
      field: 'id',
      headerName: 'Edit',
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <Link to={`/gun/${params.id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDeleteClick(`${params.id}`)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      flex: 1,
      hide: true,
    },
    {
      field: 'modelName',
      headerName: 'Model',
      flex: 1,
    },
    {
      field: 'serialNumber',
      headerName: 'Serial Number',
      flex: 1,
    },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
    },
    {
      field: 'caliber',
      headerName: 'Caliber',
      flex: 1,
    },
    {
      field: 'dealer',
      headerName: 'Dealer',
      flex: 1,
      hide: true,
    },
    {
      field: 'ffl',
      headerName: 'FFL',
      flex: 1,
      hide: true,
    },
  ];

  return (
    <>
      <DataGrid
        autoHeight
        isRowSelectable={false}
        disableSelectionOnClick
        density="standard"
        hideFooter
        hideFooterPagination
        rows={guns}
        columns={columns}
      />
    </>
  );
}

GunGrid.propTypes = {
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunGrid;
