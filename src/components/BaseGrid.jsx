import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { Button } from '@mui/material';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';

const gridStyle = {
  minHeight: 250,
  height: '65vh',
};

const scrollProps = {
  autoHide: false,
};

function BaseGrid({ data, columns, storageKey }) {
  const loadData = ({ sortInfo }) => {
    if (sortInfo === null || sortInfo === undefined) {
      return data;
    }

    if (sortInfo.dir === -1) {
      return data.sort((a, b) => (a[sortInfo.id] < b[sortInfo.id] ? 1 : -1));
    }

    return data.sort((a, b) => (a[sortInfo.id] > b[sortInfo.id] ? 1 : -1));
  };

  const dataSource = useCallback(loadData, [data]);

  const [sortInfo, setSortInfo] = useState(() => {
    const savedState = JSON.parse(
      localStorage.getItem(`${storageKey}-sortInfo`),
    );
    return savedState ?? null;
  });

  const [columnOrder, setColumnOrder] = useState(() => {
    const savedState = JSON.parse(
      localStorage.getItem(`${storageKey}-columnOrder`),
    );
    return savedState ?? columns.map((column) => column.name);
  });

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedState = JSON.parse(
      localStorage.getItem(`${storageKey}-visibleColumns`),
    );
    return savedState ?? columns.map((column) => column.name);
  });

  const [columnWidths, setColumnWidths] = useState(() => {
    const savedState = JSON.parse(
      localStorage.getItem(`${storageKey}-columnWidths`),
    );
    return savedState ?? [];
  });

  const [gridColumns, setGridColumns] = useState(() => {
    const cols = columns.map((column) => ({
      ...column,
      showColumnMenuLockOptions: false,
      showColumnMenuGroupOptions: false,
    }));

    return cols;
  });

  useEffect(() => {
    gridColumns.forEach((column) => {
      column.visible = visibleColumns.includes(column.name);
    });

    columnWidths.forEach((colWidth) => {
      gridColumns
        .filter((col) => col.name === colWidth.name)
        .forEach((col) => {
          /* eslint no-param-reassign: "error" */
          col.size = colWidth.size;
          col.flex = colWidth.flex;
        });
    });
  }, [gridColumns, visibleColumns, columnWidths]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}-sortInfo`, JSON.stringify(sortInfo));
  }, [sortInfo, storageKey]);

  useEffect(() => {
    localStorage.setItem(
      `${storageKey}-visibleColumns`,
      JSON.stringify(visibleColumns),
    );
  }, [visibleColumns, storageKey]);

  useEffect(() => {
    localStorage.setItem(
      `${storageKey}-columnOrder`,
      JSON.stringify(columnOrder),
    );
  }, [columnOrder, storageKey]);

  useEffect(() => {
    localStorage.setItem(
      `${storageKey}-columnWidths`,
      JSON.stringify(columnWidths),
    );
  }, [columnWidths, storageKey]);

  const [theme, setTheme] = useState(() => {
    const useDark = localStorage.getItem('darkState') === 'true';
    return useDark ? 'default-dark' : 'default-light';
  });

  PubSub.subscribe('THEME-CHANGE', (msg, msgData) => {
    setTheme(msgData ? 'default-dark' : 'default-light');
  });

  const handleSortInfoChange = (param) => {
    setSortInfo(param);
  };

  const handleColumnOrderChange = (param) => {
    setColumnOrder(param);
  };

  const handleColumnVisibleChange = ({ column, visible }) => {
    if (visible && !visibleColumns.includes(column.name)) {
      setVisibleColumns(...visibleColumns, column.name);
    } else if (!visible && visibleColumns.includes(column.name)) {
      setVisibleColumns(
        visibleColumns.filter((columnName) => columnName !== column.name),
      );
    }

    const cols = gridColumns.map((gridColumn) => ({
      ...gridColumn,
      visible: gridColumn.name === column.name ? visible : gridColumn.visible,
    }));
    setGridColumns(cols);
  };

  const handleBatchColumnResize = (columnsInfo) => {
    const widths = columnsInfo.map((info) => ({
      size: info.size,
      width: info.width,
      flex: info.flex,
      name: info.column.name,
    }));
    setColumnWidths(widths);

    const cols = gridColumns.map((gridColumn) => ({
      ...gridColumn,
    }));

    columnsInfo.forEach((colWidth) => {
      cols
        .filter((col) => col.name === colWidth.name)
        .forEach((col) => {
          /* eslint no-param-reassign: "error" */
          col.size = colWidth.size;
          col.flex = colWidth.flex;
        });
    });

    setGridColumns(cols);
  };

  const handleResetLayout = () => {
    setSortInfo([]);
    setColumnOrder(columns.map((column) => column.name));
    setVisibleColumns(
      columns
        .filter((column) => column.visible !== false)
        .map((column) => column.name),
    );
    setColumnWidths([]);

    const cols = columns.map((column) => ({
      ...column,
      showColumnMenuLockOptions: false,
      showColumnMenuGroupOptions: false,
    }));
    setGridColumns(cols);
  };

  return (
    <>
      <ReactDataGrid
        idProperty="id"
        columns={gridColumns}
        dataSource={dataSource}
        theme={theme}
        sortInfo={sortInfo}
        columnOrder={columnOrder}
        onSortInfoChange={handleSortInfoChange}
        onColumnOrderChange={handleColumnOrderChange}
        onBatchColumnResize={handleBatchColumnResize}
        onColumnVisibleChange={handleColumnVisibleChange}
        style={gridStyle}
        scrollProps={scrollProps}
      />
      <Button variant="text" onClick={handleResetLayout}>
        Reset Layout
      </Button>
    </>
  );
}

BaseGrid.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  storageKey: PropTypes.string.isRequired,
};

export default BaseGrid;
