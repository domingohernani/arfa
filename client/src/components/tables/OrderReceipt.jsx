import React, { useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { formatToPeso, getOrderStatusStyles } from "../globalFunctions";

const OrderReceipt = ({ details, customer }) => {
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    {
      headerName: "No",
      field: "receiptNumber",
      flex: 1,
      cellRenderer: (params) => (
        <span>{params.value}</span>
      ),
    },
    {
      headerName: "Total Amount (₱)",
      field: "totalAmount",
      flex: 1,
      valueFormatter: (params) => formatToPeso(params.value),
    },
    {
      headerName: "Customer",
      field: "customerName",
      flex: 2,
      cellRenderer: (params) => (
        <span>{params.value}</span>
      ),
    },
    {
      headerName: "No. of Items",
      field: "numberOfItems",
      flex: 1,
      cellRenderer: (params) => <span>{params.value}</span>,
    },
    {
      headerName: "Status",
      field: "status",
      flex: 1,
      cellRenderer: (params) => {
        const { statusText, colorClass, bgColorClass } =
          getOrderStatusStyles(params.value);
        return (
          <div className="flex items-center space-x-2">
            <span className={`font-semibold ${colorClass}`}>{statusText}</span>
            <div className={`w-3 h-3 rounded-full ${bgColorClass}`}></div>
          </div>
        );
      },
    },
    {
      headerName: "Date",
      field: "date",
      flex: 1,
      valueGetter: (params) => {
        const createdAtDate = params.data.date;
        if (createdAtDate && createdAtDate.seconds) {
          return new Date(createdAtDate.seconds * 1000);
        }
        return null;
      },
      valueFormatter: (params) => {
        const date = params.value;
        if (date instanceof Date) {
          return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
        return "";
      },
    },

  ];

  // Populate row data based on details prop
  useEffect(() => {
    if (details) {
      setRowData([
        {
          receiptNumber: details.id,
          totalAmount: details.orderTotal,
          customerName: customer.firstName + customer.lastName,
          numberOfItems: details.orderItems.reduce(
            (total, item) => total + item.quantity,
            0
          ),
          status: details.orderStatus,
          date: details.createdAt,
        },
      ]);
    }
  }, [details]);

  return (
    <div className="ag-theme-quartz" style={{ height: "200px", width: "100%" }}>
      <section className="px-3 py-4 border-t bg-arfagray border-x">
        <span className="font-medium">Receipt</span>
      </section>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        headerHeight={30}
        rowHeight={40}
        domLayout="autoHeight"
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
