import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BaseGrid from './BaseGrid';

const gridStorageKey = 'ammogrid';

function AmmoGrid({ ammo, handleDeleteClick }) {
  const hiddenColumnNames =
    JSON.parse(localStorage.getItem(`${gridStorageKey}-hiddencolumns`)) ?? [];

  const columns = [
    {
      field: 'id',
      headerName: 'Edit',
      minWidth: 120,
      hide: hiddenColumnNames.includes('id'),
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
      hide: hiddenColumnNames.includes('caliber'),
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      hide: hiddenColumnNames.includes('name'),
      flex: 1,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      hide: hiddenColumnNames.includes('brand'),
      flex: 1,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      hide: hiddenColumnNames.includes('weight'),
      flex: 1,
    },
    {
      field: 'bulletType',
      headerName: 'Bullet Type',
      hide: hiddenColumnNames.includes('bulletType'),
      flex: 1,
    },
    {
      field: 'roundCount',
      headerName: 'Round Count',
      hide: hiddenColumnNames.includes('roundCount'),
      flex: 1,
    },
    {
      field: 'purchasedFrom',
      headerName: 'Purchased From',
      hide: hiddenColumnNames.includes('purchasedFrom'),
      flex: 1,
    },
    {
      field: 'purchasePrice',
      headerName: 'Purchase Price',
      hide: hiddenColumnNames.includes('purchasePrice'),
      flex: 1,
    },
    {
      field: 'pricePerRound',
      headerName: 'Price Per Round',
      hide: hiddenColumnNames.includes('pricePerRound'),
      flex: 1,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <BaseGrid rows={ammo} columns={columns} storageKey={gridStorageKey} />
    </div>
  );
}

AmmoGrid.propTypes = {
  ammo: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default AmmoGrid;
