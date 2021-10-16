import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BaseGrid from './BaseGrid';

const gridStorageKey = 'gungrid';

function GunGrid({ guns, handleDeleteClick }) {
  const hiddenColumnNames =
    JSON.parse(localStorage.getItem(`${gridStorageKey}-hiddencolumns`)) ?? [];

  const columns = [
    {
      field: 'id',
      hide: hiddenColumnNames.includes('id'),
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
    {
      field: 'name',
      hide: hiddenColumnNames.includes('name'),
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'manufacturer',
      hide: hiddenColumnNames.includes('manufacturer'),
      headerName: 'Manufacturer',
      flex: 1,
    },
    {
      field: 'modelName',
      hide: hiddenColumnNames.includes('modelName'),
      headerName: 'Model',
      flex: 1,
    },
    {
      field: 'serialNumber',
      hide: hiddenColumnNames.includes('serialNumber'),
      headerName: 'Serial Number',
      flex: 1,
    },
    {
      field: 'type',
      hide: hiddenColumnNames.includes('type'),
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'action',
      hide: hiddenColumnNames.includes('action'),
      headerName: 'Action',
      flex: 1,
    },
    {
      field: 'caliber',
      hide: hiddenColumnNames.includes('caliber'),
      headerName: 'Caliber',
      flex: 1,
    },
    {
      field: 'dealer',
      hide: hiddenColumnNames.includes('dealer'),
      headerName: 'Dealer',
      flex: 1,
    },
    {
      field: 'ffl',
      hide: hiddenColumnNames.includes('ffl'),
      headerName: 'FFL',
      flex: 1,
    },
  ];

  return (
    <>
      <BaseGrid rows={guns} columns={columns} storageKey={gridStorageKey} />
    </>
  );
}

GunGrid.propTypes = {
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunGrid;
