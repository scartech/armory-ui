import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { BrowserView, MobileView } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import MobileGridItem from './MobileGridItem';
import DataGridFilter from './DataGridFilter';

const useStyles = makeStyles((theme) => ({
  csvLink: {
    textDecoration: 'none',
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

function DataGrid({ data, columns, csvName, onRowDoubleClicked }) {
  const classes = useStyles();

  const [filterText, setFilterText] = useState('');
  const [gridData, setGridData] = useState([]);
  const [striped, setStriped] = useState(
    () => localStorage.getItem('darkState') !== 'true',
  );

  const [theme, setTheme] = useState(() => {
    const useDark = localStorage.getItem('darkState') === 'true';
    return useDark ? 'dark' : 'default';
  });

  PubSub.subscribe('THEME-CHANGE', (msg, msgData) => {
    setTheme(msgData ? 'dark' : 'default');
    setStriped(!msgData);
  });

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const handleRowDoubleClick = (row) => {
    onRowDoubleClicked(row);
  };

  const handleFilterTextChange = (event) => {
    const { value } = event.target;
    setFilterText(value);

    const valueNames = columns.filter((x) => 'field' in x).map((x) => x.field);
    const unfiltered = [...data];
    const filtered = unfiltered.filter((x) => {
      for (let i = 0; i < valueNames.length; i += 1) {
        if (
          x[valueNames[i]] !== null &&
          x[valueNames[i]] !== undefined &&
          x[valueNames[i]]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return true;
        }
      }

      return false;
    });

    setGridData(filtered);
  };

  const handleFilterClear = () => {
    setFilterText('');
    setGridData(data);
  };

  return (
    <>
      <BrowserView>
        <DataGridFilter
          filterText={filterText}
          onFilter={handleFilterTextChange}
          onClear={handleFilterClear}
        />
        <DataTable
          columns={columns}
          data={gridData}
          theme={theme}
          pagination
          highlightOnHover
          pointerOnHover
          striped={striped}
          onRowDoubleClicked={handleRowDoubleClick}
        />
        <CSVLink data={gridData} className={classes.csvLink} filename={csvName}>
          <Button className={classes.button} variant="text">
            Download CSV
          </Button>
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
