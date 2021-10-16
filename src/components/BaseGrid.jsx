import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

function BaseGrid({ rows, columns, storageKey }) {
  const [sortModel, setSortModel] = useState(() => {
    const model =
      JSON.parse(localStorage.getItem(`${storageKey}-sortmodel`)) ?? [];
    return model;
  });

  const [hiddenColumns, setHiddenColumns] = useState(() => {
    const storageColumns =
      JSON.parse(localStorage.getItem(`${storageKey}-hiddencolumns`)) ?? [];
    return storageColumns;
  });

  const handleColumnVisibilityChange = (params) => {
    let newHiddenColumns;
    const { field, isVisible } = params;

    if (isVisible) {
      newHiddenColumns = hiddenColumns.filter((x) => x !== params.field);
    } else {
      newHiddenColumns = [...hiddenColumns, field];
    }

    setHiddenColumns(newHiddenColumns);
  };

  const handleSortModelChange = (model) => {
    setSortModel(model);
    localStorage.setItem(`${storageKey}-sortmodel`, JSON.stringify(model));
  };

  useEffect(() => {
    localStorage.setItem(
      `${storageKey}-hiddencolumns`,
      JSON.stringify(hiddenColumns),
    );
  }, [hiddenColumns, storageKey]);

  return (
    <>
      <DataGrid
        autoHeight
        isRowSelectable={() => false}
        disableSelectionOnClick
        density="standard"
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        onSortModelChange={handleSortModelChange}
        sortModel={sortModel}
      />
    </>
  );
}

BaseGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  storageKey: PropTypes.string.isRequired,
};

export default BaseGrid;
