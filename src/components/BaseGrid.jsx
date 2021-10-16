import { useState } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';

function BaseGrid({ rows, columns }) {
  const [theme, setTheme] = useState(() => {
    const useDark = localStorage.getItem('darkState') === 'true';
    return useDark ? 'default-dark' : 'default-light';
  });

  PubSub.subscribe('THEME-CHANGE', (msg, data) => {
    setTheme(data ? 'default-dark' : 'default-light');
  });

  return (
    <>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={rows}
        theme={theme}
      />
    </>
  );
}

BaseGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default BaseGrid;
