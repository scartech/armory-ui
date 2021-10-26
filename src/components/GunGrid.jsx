import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { v4 as uuidv4 } from 'uuid';
import DataGrid from './DataGrid';

const gridStorageKey = 'gungrid';
const csvName = 'Gun-Data.csv';

function GunGrid({ guns, handleDeleteClick }) {
  const columns = [
    {
      name: 'id',
      header: 'Ops',
      width: 210,
      isOp: true,
      render: (value) => [
        <Link to={`/gun/${value.data.id}`} key={uuidv4()}>
          <IconButton size="large">
            <EditIcon />
          </IconButton>
        </Link>,
        <Link to={`/images/${value.data.id}`} key={uuidv4()}>
          <IconButton size="large">
            <PhotoCameraIcon />
          </IconButton>
        </Link>,
        <Link to={`/gun/${value.data.id}/history`} key={uuidv4()}>
          <IconButton size="large">
            <EventNoteIcon />
          </IconButton>
        </Link>,
        <IconButton
          key={uuidv4()}
          onClick={() => handleDeleteClick(`${value.data.id}`)}
          size="large"
        >
          <DeleteIcon />
        </IconButton>,
      ],
    },
    {
      name: 'name',
      header: 'Name',
      defaultFlex: 1,
    },
    {
      name: 'manufacturer',
      header: 'Manufacturer',
      defaultFlex: 1,
    },
    {
      name: 'modelName',
      header: 'Model',
      defaultFlex: 1,
    },
    {
      name: 'serialNumber',
      header: 'Serial Number',
      defaultFlex: 1,
    },
    {
      name: 'type',
      header: 'Type',
      defaultFlex: 1,
    },
    {
      name: 'action',
      header: 'Action',
      defaultFlex: 1,
    },
    {
      name: 'caliber',
      header: 'Caliber',
      defaultFlex: 1,
    },
    {
      name: 'dealer',
      header: 'Dealer',
      defaultFlex: 1,
    },
    {
      name: 'ffl',
      header: 'FFL',
      defaultFlex: 1,
    },
    {
      name: 'rating',
      header: 'Rating',
      defaultFlex: 1,
      hasRender: true,
      render: (value) => (
        <Rating value={value.data.rating} precision={0.5} readOnly />
      ),
    },
  ];

  return (
    <DataGrid
      data={guns}
      columns={columns}
      storageKey={gridStorageKey}
      csvName={csvName}
    />
  );
}

GunGrid.propTypes = {
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunGrid;
