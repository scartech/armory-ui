import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import DataGrid from './DataGrid';

const gridStorageKey = 'inventorygrid';
const csvName = 'Inventory-Data.csv';

const numberFormatter = new Intl.NumberFormat('en-US');

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
});

function InventoryGrid({ inventory, handleDeleteClick }) {
  const buildOps = (value) => {
    if (
      value.data.count === 0 &&
      value.data.totalShot === 0 &&
      value.data.totalPurchased === 0
    ) {
      return [
        <Link to={`/inventory/item/${value.data.id}`} key={uuidv4()}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Link>,
        <IconButton
          size="small"
          key={uuidv4()}
          data-id={value.data.id}
          onClick={(e) => handleDeleteClick(e.currentTarget.dataset.id)}
        >
          <DeleteIcon />
        </IconButton>,
      ];
    }

    return [
      <Link to={`/inventory/item/${value.data.id}`} key={uuidv4()}>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Link>,
    ];
  };

  const columns = [
    {
      name: 'id',
      header: 'Ops',
      width: 90,
      sortable: false,
      draggable: false,
      isOp: true,
      render: buildOps,
    },
    {
      name: 'caliber',
      header: 'Caliber',
      defaultFlex: 1,
    },
    {
      name: 'brand',
      header: 'Brand',
      defaultFlex: 1,
    },
    {
      name: 'name',
      header: 'Name',
      defaultFlex: 1,
    },
    {
      name: 'count',
      header: 'Current Stock',
      defaultFlex: 1,
      hasRender: true,
      render: (value) => {
        const val = value?.data
          ? numberFormatter.format(value.data.count)
          : '0';
        return val;
      },
    },
    {
      name: 'totalPurchased',
      header: 'Total Purchased',
      defaultFlex: 1,
      hasRender: true,
      render: (value) => {
        const val = value?.data
          ? numberFormatter.format(value.data.totalPurchased)
          : '0';
        return val;
      },
    },
    {
      name: 'totalShot',
      header: 'Total Shot',
      defaultFlex: 1,
      hasRender: true,
      render: (value) => {
        const val = value?.data
          ? numberFormatter.format(value.data.totalShot)
          : '0';
        return val;
      },
    },
    {
      name: 'totalPurchasePrice',
      header: 'Total Investment',
      defaultFlex: 1,
      hasRender: true,
      render: (value) => {
        const val = value?.data
          ? currencyFormatter.format(value.data.totalPurchasePrice)
          : '$0.00';
        return val;
      },
    },
    {
      name: 'goal',
      header: 'Goal',
      defaultFlex: 1,
      hasRender: true,
      render: (value) => {
        const val = value?.data ? numberFormatter.format(value.data.goal) : '0';
        return val;
      },
    },
  ];

  return (
    <DataGrid
      data={inventory}
      columns={columns}
      storageKey={gridStorageKey}
      csvName={csvName}
    />
  );
}

InventoryGrid.propTypes = {
  inventory: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default InventoryGrid;
