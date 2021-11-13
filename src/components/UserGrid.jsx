import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserGridOps from './UserGridOps';
import DataGrid from './DataGrid';

const csvName = 'Users-Data.csv';

function UserGrid({ data, handleDeleteClick }) {
  const history = useHistory();

  const columns = [
    {
      selector: (row) => row.name,
      name: 'Name',
      sortable: true,
      reorder: true,
      field: 'name',
    },
    {
      selector: (row) => row.email,
      name: 'Email',
      sortable: true,
      reorder: true,
      field: 'email',
    },
    {
      selector: (row) => row.role,
      name: 'Role',
      sortable: true,
      reorder: true,
      field: 'role',
    },
    {
      selector: (row) => row.enabled.toString(),
      name: 'Enabled',
      sortable: true,
      reorder: true,
      field: 'enabled',
    },
    {
      name: 'Ops',
      width: '60px',
      center: true,
      button: true,
      cell: (row) => (
        <UserGridOps
          key={row.id}
          id={row.id}
          handleDeleteClick={handleDeleteClick}
        />
      ),
    },
  ];

  const handleRowDoublClicked = (item) => {
    history.push(`/user/${item.id}`);
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

UserGrid.propTypes = {
  data: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default UserGrid;
