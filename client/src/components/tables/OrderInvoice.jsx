import React from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const OrderInvoice = () => {
  const columnDefs = [
    { headerName: "No", field: "no", flex: 1 },
    {
      headerName: "Amount",
      field: "amount",
      flex: 1,
      //   valueFormatter: currencyFormatter,
    },
    { headerName: "Customer", field: "customer", flex: 1 },
    { headerName: "Status", field: "status", flex: 1 },
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

  //   // Format currency for the Amount column
  //   const currencyFormatter = (params) => {
  //     return `$${params.value.toFixed(2)}`;
  //   };

  //   // Format date to 'DD MMM YYYY'
  //   const dateFormatter = (params) => {
  //     const date = new Date(params.value);
  //     return date.toLocaleDateString("en-GB", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     });
  //   };

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

export default OrderInvoice;
