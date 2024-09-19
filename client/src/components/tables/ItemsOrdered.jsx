import React, { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const ItemsOrdered = () => {
  const columnDefs = [
    { headerName: "Items Name", field: "itemName", flex: 2 },
    { headerName: "SKU", field: "sku", flex: 1 },
    { headerName: "Location", field: "location", flex: 2 },
    { headerName: "Quantity", field: "quantity", flex: 1, editable: true },
    { headerName: "Price", field: "price", flex: 1 },
    { headerName: "Total", field: "total", flex: 1 },
  ];

  const rowData = [
    {
      itemName: "Smooth lather",
      sku: "6473FGDH7",
      location: "Shop 34 floor CA, US",
      quantity: 14,
      price: 45.0,
      total: 45.0,
    },
    {
      itemName: "PVC Plastic",
      sku: "183GD9983",
      location: "Shop 34 floor CA, US",
      quantity: 12,
      price: 49.65,
      total: 49.65,
    },
    {
      itemName: "PVC Plastic",
      sku: "183GD9983",
      location: "Shop 34 floor CA, US",
      quantity: 12,
      price: 49.65,
      total: 49.65,
    },
    {
      itemName: "PVC Plastic",
      sku: "183GD9983",
      location: "Shop 34 floor CA, US",
      quantity: 12,
      price: 49.65,
      total: 49.65,
    },
    {
      itemName: "PVC Plastic",
      sku: "183GD9983",
      location: "Shop 34 floor CA, US",
      quantity: 12,
      price: 49.65,
      total: 49.65,
    },
  ];

  const pinnedBottomRowData = [
    { itemName: "Subtotal", total: 94.65 },
    { itemName: "Free Shipping", total: 0.0 },
    { itemName: "Tax Amount (10%)", total: 9.47 },
    { itemName: "Total", total: 104.12 },
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
