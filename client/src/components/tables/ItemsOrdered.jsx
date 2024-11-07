import React, { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { formatToPeso } from "../globalFunctions";

const ItemsOrdered = ({ orders }) => {
  const columnDefs = [
    { headerName: "Items Name", field: "name", flex: 2 },
    { headerName: "Quantity", field: "quantity", flex: 1, editable: true },
    {
      headerName: "Price (₱)",
      field: "price",
      flex: 1,
      valueFormatter: (params) => formatToPeso(params.value),
    },
    {
      headerName: "Total (₱)",
      field: "totalItemPrice",
      flex: 1,
      valueFormatter: (params) => formatToPeso(params.value),
    },
  ];

  const rowData = [
    ...orders,
  ];

  const pinnedBottomRowData = [
    { name: "Subtotal", totalItemPrice: 94.65 },
    { name: "Free Shipping", totalItemPrice: 0.0 },
    { name: "Tax Amount (10%)", totalItemPrice: 9.47 },
    { name: "Total", totalItemPrice: 104.12 },
  ];

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pinnedBottomRowData={pinnedBottomRowData}
        defaultColDef={{
          resizable: true,
          sortable: true,
          flex: 1,
        }}
      />
    </div>
  );
};

export default ItemsOrdered;
