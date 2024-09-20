import React from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { getOrderStatusStyles } from "../globalFunctions";

const OrderReceipt = () => {
  const columnDefs = [
    { headerName: "No", field: "no", flex: 1 },
    {
      headerName: "Total Amount (₱)",
      field: "amount",
      flex: 1,
      //   valueFormatter: currencyFormatter,
    },
    { headerName: "Customer", field: "customer", flex: 2 },
    { headerName: "No. of Items", field: "numberOfItems" },
    {
      headerName: "Status",
      field: "status",
      flex: 1,
      cellRenderer: (params) => {
        const { statusText, colorClass, bgColorClass } =
          getOrderStatusStyles("Ready");
        return (
          <div className="flex items-center justify-between">
            <span className={`font-bold ${colorClass} font-normal`}>
              {statusText}
            </span>
            <div className={`w-3 h-3 rounded-full ${bgColorClass}`}></div>
          </div>
        );
      },
    },
    {
      headerName: "Date",
      field: "date",
      flex: 1,
      //   valueFormatter: dateFormatter,
    },
  ];

  const rowData = [
    {
      no: "3553788",
      amount: 356.0,
      customer: "John Smith",
      status: "14",
      date: "2024-02-21",
    },
  ];

  return (
    <div className="ag-theme-quartz" style={{ height: 100, width: "100%" }}>
      <section className="px-3 py-4 border-t bg-arfagray border-x">
        <span className="font-medium">Receipt</span>
      </section>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{
          resizable: true,
          sortable: true,
          flex: 1,
        }}
      />
    </div>
  );
};

export default OrderReceipt;
