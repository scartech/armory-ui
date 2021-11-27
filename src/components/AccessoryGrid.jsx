import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AccessoryGridOps from './AccessoryGridOps';
import DataGrid from './DataGrid';

const csvName = 'Accessory-Data.csv';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
});

const numberFormatter = new Intl.NumberFormat('en-US');

function AccessoryGrid({ data, handleDeleteClick }) {
  const history = useHistory();

  const columns = [
    {
      selector: (row) => row.type,
      name: 'Type',
      sortable: true,
      reorder: true,
      field: 'type',
    },
    {
      selector: (row) => row.modelName,
      name: 'Model Name',
      sortable: true,
      reorder: true,
      field: 'modelName',
    },
    {
      selector: (row) => row.manufacturer,
      name: 'Manufacturer',
      sortable: true,
      reorder: true,
      field: 'manufacturer',
    },
    {
      selector: (row) => row.count,
      name: 'Count',
      sortable: true,
      reorder: true,
      field: 'count',
      format: (row) => numberFormatter.format(row.count),
    },
    {
      selector: (row) => row.purchasedFrom,
      name: 'Purchased From',
      sortable: true,
      reorder: true,
      field: 'purchasedFrom',
    },
    {
      selector: (row) => row.purchasePrice,
      name: 'Purchase Price',
      sortable: true,
      reorder: true,
      field: 'purchasePrice',
      format: (row) => currencyFormatter.format(row.purchasePrice),
    },
    {
      selector: (row) => row.pricePerItem,
      name: 'Price Per Item',
      sortable: true,
      reorder: true,
      field: 'pricePerItem',
      format: (row) => currencyFormatter.format(row.pricePerItem),
    },
    {
      name: '',
      width: '40px',
      center: true,
      button: true,
      cell: (row) => (
        <AccessoryGridOps
          key={row.id}
          id={row.id}
          handleDeleteClick={handleDeleteClick}
        />
      ),
    },
  ];

  const handleRowDoublClicked = (accessory) => {
    history.push(`/accessory/${accessory.id}`);
  };

  return (
    <DataGrid
      data={data}
      columns={columns}
      onRowDoubleClicked={handleRowDoublClicked}
      csvName={csvName}
    />
  );
}

AccessoryGrid.propTypes = {
  data: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default AccessoryGrid;
