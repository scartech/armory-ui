import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import DataGrid from './DataGrid';

const gridStorageKey = 'inventorygrid';
const csvName = 'Inventory-Data.csv';

const numberFormatter = new Intl.NumberFormat('en-US');

function InventoryGrid({ inventory }) {
  const columns = [
    {
      name: 'id',
      header: 'Ops',
      width: 60,
      sortable: false,
      draggable: false,
      isOp: true,
      render: (value) => [
        <Link to={`/inventory/item/${value.data.id}`} key={uuidv4()}>
          <IconButton size="large">
            <EditIcon />
          </IconButton>
        </Link>,
      ],
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
      header: 'Count',
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
};

export default InventoryGrid;
