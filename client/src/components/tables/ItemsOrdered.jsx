import React, { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { formatToPeso } from "../globalFunctions";

const ItemsOrdered = ({ orders }) => {
  const columnDefs = [
    { headerName: "Items Name", field: "name", flex: 1 },
    { headerName: "Quantity", field: "quantity", flex: 1, editable: true },
    {
      headerName: "Total (₱)",
      field: "totalItemPrice",
      flex: 1,
      valueFormatter: (params) => formatToPeso(params.value),
    },
  ];

  const rowData = [
    ...orders.orderItems,
  ];

  const pinnedBottomRowData = [
    { name: "Subtotal", totalItemPrice: orders.orderTotal },
    { name: "Free Shipping", totalItemPrice: orders.deliveryFee },
    { name: "Commision Rate (5%)", totalItemPrice: orders.orderTotal * 0.05 },
    {
      name: "Total",
      totalItemPrice: orders.orderTotal + orders.deliveryFee + (orders.orderTotal * 0.05),
    },
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
