import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import InventoryGridOps from './InventoryGridOps';
import DataGrid from './DataGrid';

const csvName = 'Inventory-Data.csv';

const numberFormatter = new Intl.NumberFormat('en-US');

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
});

function InventoryGrid({ data, handleDeleteClick }) {
  const history = useHistory();

  const columns = [
    {
      selector: (row) => row.caliber,
      name: 'Caliber',
      sortable: true,
      reorder: true,
      field: 'caliber',
    },
    {
      selector: (row) => row.brand,
      name: 'Brand',
      sortable: true,
      reorder: true,
      field: 'brand',
    },
    {
      selector: (row) => row.name,
      name: 'Name',
      sortable: true,
      reorder: true,
      field: 'name',
    },
    {
      selector: (row) => row.count,
      name: 'Current Stock',
      sortable: true,
      reorder: true,
      field: 'count',
      format: (row) => numberFormatter.format(row.count),
    },
    {
      selector: (row) => row.totalPurchased,
      name: 'Total Purchased',
      sortable: true,
      reorder: true,
      field: 'totalPurchased',
      format: (row) => numberFormatter.format(row.totalPurchased),
    },
    {
      selector: (row) => row.totalShot,
      name: 'Total Shot',
      sortable: true,
      reorder: true,
      field: 'totalShot',
      format: (row) => numberFormatter.format(row.totalShot),
    },
    {
      selector: (row) => row.totalPurchasePrice,
      name: 'Total Investment',
      sortable: true,
      reorder: true,
      field: 'totalPurchasePrice',
      format: (row) => currencyFormatter.format(row.totalPurchasePrice),
    },
    {
      selector: (row) => row.goal,
      name: 'Goal',
      sortable: true,
      reorder: true,
      field: 'goal',
      format: (row) => numberFormatter.format(row.goal),
    },
    {
      name: 'Ops',
      width: '60px',
      center: true,
      button: true,
      cell: (row) => (
        <InventoryGridOps
          key={row.id}
          id={row.id}
          handleDeleteClick={handleDeleteClick}
          canDelete={
            row.count === 0 && row.totalShot === 0 && row.totalPurchased === 0
          }
        />
      ),
    },
  ];

  const handleRowDoublClicked = (item) => {
    history.push(`/inventory/item/${item.id}`);
  };

  return (
    <DataGrid
      data={data}
      columns={columns}
      csvName={csvName}
      onRowDoubleClicked={handleRowDoublClicked}
    />
  );
}

InventoryGrid.propTypes = {
  data: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default InventoryGrid;
