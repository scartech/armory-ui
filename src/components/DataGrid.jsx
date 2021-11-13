import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { BrowserView, MobileView } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import MobileGridItem from './MobileGridItem';

const useStyles = makeStyles(() => ({
  csvLink: {
    textDecoration: 'none',
  },
}));

function DataGrid({ data, columns, csvName, onRowDoubleClicked }) {
  const classes = useStyles();

  const [theme, setTheme] = useState(() => {
    const useDark = localStorage.getItem('darkState') === 'true';
    return useDark ? 'dark' : 'default';
  });

  PubSub.subscribe('THEME-CHANGE', (msg, msgData) => {
    setTheme(msgData ? 'dark' : 'default');
  });

  const handleRowDoubleClick = (row) => {
    onRowDoubleClicked(row);
  };

  return (
    <>
      <BrowserView>
        <DataTable
          columns={columns}
          data={data}
          theme={theme}
          pagination
          highlightOnHover
          pointerOnHover
          striped
          onRowDoubleClicked={handleRowDoubleClick}
        />
        <CSVLink data={data} className={classes.csvLink} filename={csvName}>
          <Button variant="text">Download CSV</Button>
        </CSVLink>
      </BrowserView>
      <MobileView>
        {data.map((item) => (
          <MobileGridItem key={uuidv4()} data={item} columns={columns} />
        ))}
      </MobileView>
    </>
  );
}

DataGrid.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  csvName: PropTypes.string.isRequired,
  onRowDoubleClicked: PropTypes.func.isRequired,
};

export default DataGrid;
