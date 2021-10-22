import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BaseGrid from './BaseGrid';

const gridStorageKey = 'ammogrid';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
});

const numberFormatter = new Intl.NumberFormat('en-US');

function AmmoGrid({ ammo, handleDeleteClick }) {
  const columns = [
    {
      name: 'id',
      header: 'Ops',
      width: 120,
      sortable: false,
      draggable: false,
      render: (value) => [
        <Link to={`/ammo/item/${value.data.id}`}>
          <IconButton size="large">
            <EditIcon />
          </IconButton>
        </Link>,
        <IconButton
          onClick={() => handleDeleteClick(`${value.data.id}`)}
          size="large"
        >
          <DeleteIcon />
        </IconButton>,
      ],
    },
    {
      name: 'caliber',
      header: 'Caliber',
      defaultFlex: 1,
    },
    {
      name: 'name',
      header: 'Name',
      defaultFlex: 1,
    },
    {
      name: 'brand',
      header: 'Brand',
      defaultFlex: 1,
    },
    {
      name: 'weight',
      header: 'Weight',
      defaultFlex: 1,
    },
    {
      name: 'bulletType',
      header: 'Bullet Type',
      defaultFlex: 1,
    },
    {
      name: 'roundCount',
      header: 'Round Count',
      defaultFlex: 1,
      render: (value) => {
        const val = value?.data
          ? numberFormatter.format(value.data.roundCount)
          : '$0.00';
        return val;
      },
    },
    {
      name: 'purchasedFrom',
      header: 'Purchased From',
      defaultFlex: 1,
    },
    {
      name: 'purchasePrice',
      header: 'Purchase Price',
      defaultFlex: 1,
      render: (value) => {
        const val = value?.data
          ? currencyFormatter.format(value.data.purchasePrice)
          : '$0.00';
        return val;
      },
    },
    {
      name: 'pricePerRound',
      header: 'Price Per Round',
      defaultFlex: 1,
      render: (value) => {
        const val = value?.data
          ? currencyFormatter.format(value.data.pricePerRound)
          : '$0.00';
        return val;
      },
    },
  ];

  return <BaseGrid data={ammo} columns={columns} storageKey={gridStorageKey} />;
}

AmmoGrid.propTypes = {
  ammo: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default AmmoGrid;
