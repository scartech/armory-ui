import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function AmmoGrid({ ammo, handleDeleteClick }) {
  const columns = [
    {
      field: 'id',
      headerName: 'Edit',
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <Link to={`/ammo/item/${params.id}`}>
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
    <>
      <DataGrid
        autoHeight
        isRowSelectable={false}
        disableSelectionOnClick
        density="standard"
        hideFooter
        hideFooterPagination
        rows={ammo}
        columns={columns}
      />
    </>
  );
}

AmmoGrid.propTypes = {
  ammo: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default AmmoGrid;
