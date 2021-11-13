import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AmmoGridOps from './AmmoGridOps';
import DataGrid from './DataGrid';

const csvName = 'Ammo-Data.csv';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
});

const numberFormatter = new Intl.NumberFormat('en-US');

function AmmoGrid({ data }) {
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
      selector: (row) => row.name,
      name: 'Name',
      sortable: true,
      reorder: true,
      field: 'name',
    },
    {
      selector: (row) => row.brand,
      name: 'Brand',
      sortable: true,
      reorder: true,
      field: 'brand',
    },
    {
      selector: (row) => row.weight,
      name: 'Weight',
      sortable: true,
      reorder: true,
      field: 'weight',
    },
    {
      selector: (row) => row.bulletType,
      name: 'Bullet Type',
      sortable: true,
      reorder: true,
      field: 'bulletType',
    },
    {
      selector: (row) => row.roundCount,
      name: 'Round Count',
      sortable: true,
      reorder: true,
      field: 'roundCount',
      format: (row) => numberFormatter.format(row.roundCount),
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
      selector: (row) => row.pricePerRound,
      name: 'Price Per Round',
      sortable: true,
      reorder: true,
      field: 'pricePerRound',
      format: (row) => currencyFormatter.format(row.pricePerRound),
    },
    {
      name: 'Ops',
      width: '60px',
      center: true,
      button: true,
      cell: (row) => <AmmoGridOps key={row.id} id={row.id} />,
    },
  ];

  const handleRowDoublClicked = (ammo) => {
    history.push(`/ammo/item/${ammo.id}`);
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

AmmoGrid.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AmmoGrid;
