import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function AmmoGrid({ ammo, handleDeleteClick }) {
  const columns = [
    {
      field: 'id',
      headerName: 'Edit',
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <Link to={`/ammo/item/${params.id}`}>
            <IconButton size="large">
              <EditIcon />
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
      field: 'caliber',
      headerName: 'Caliber',
      flex: 1,
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: 1,
    },
    {
      field: 'bulletType',
      headerName: 'Bullet Type',
      flex: 1,
    },
    { field: 'roundCount', headerName: 'Round Count', flex: 1 },
    {
      field: 'purchasedFrom',
      headerName: 'Purchased From',
      flex: 1,
    },
    {
      field: 'purchasePrice',
      headerName: 'Purchase Price',
      flex: 1,
    },
    {
      field: 'pricePerRound',
      headerName: 'Price Per Round',
      flex: 1,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={ammo}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        isRowSelectable={false}
        disableSelectionOnClick
        density="standard"
      />
    </div>
  );
}

AmmoGrid.propTypes = {
  ammo: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default AmmoGrid;
