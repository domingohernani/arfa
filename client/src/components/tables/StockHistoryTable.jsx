import React, { useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const StockHistoryTable = ({ stocks }) => {
  // Update column definitions to match stock data fields
  const columnDefs = useMemo(
    () => [
      { headerName: "Product ID", field: "id", flex: 1 },
      { headerName: "Old Quantity", field: "oldQuantity", flex: 1 },
      { headerName: "New Quantity", field: "newQuantity", flex: 1 },
      { headerName: "Quantity Added", field: "quantityAdded", flex: 1 },
      {
        headerName: "Updated At",
        field: "updatedAt",
        flex: 2,
        sort: "desc",
        sortIndex: 0,
        valueGetter: (params) => {
          const updatedAt = params.data.updatedAt;
          return updatedAt ? new Date(updatedAt.seconds * 1000) : null;
        },
        valueFormatter: (params) => {
          const date = params.value;
          if (date instanceof Date) {
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
          }
          return "";
        },
      },
    ],
    []
  );

  return (
    <div className="ag-theme-quartz" style={{ height: 600 }}>
      <AgGridReact
        rowData={stocks} // Passing the fetched stocks data as rowData
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default StockHistoryTable;
