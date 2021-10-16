import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EventNoteIcon from '@mui/icons-material/EventNote';

function GunGrid({ guns, handleDeleteClick }) {
  const columns = [
    {
      field: 'id',
      headerName: 'Edit',
      minWidth: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/gun/${params.id}`}>
            <IconButton size="large">
              <EditIcon />
            </IconButton>
          </Link>
          <Link to={`/images/${params.id}`}>
            <IconButton size="large">
              <PhotoCameraIcon />
            </IconButton>
          </Link>
          <Link to={`/gun/${params.id}/history`}>
            <IconButton size="large">
              <EventNoteIcon />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => handleDeleteClick(`${params.id}`)}
            size="large"
          >
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
        isRowSelectable={() => false}
        disableSelectionOnClick
        density="standard"
        rows={guns}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
      />
    </>
  );
}

GunGrid.propTypes = {
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunGrid;
