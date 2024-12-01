import React, { useEffect, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { formatToPeso } from "../globalFunctions";
import { getCommissionRate, getTax } from "../../firebase/platform";

const ItemsOrdered = ({ orders }) => {
  const [taxRate, setTaxRate] = useState(0);
  const [commissionRate, setCommissionRate] = useState(0);

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const taxData = await getTax();
        setTaxRate(taxData.value);
      } catch (error) {
        console.error("Failed to fetch tax rate:", error);
      }
    };

    const fetchCommission = async () => {
      try {
        const commissionData = await getCommissionRate();
        setCommissionRate(commissionData.value);
      } catch (error) {
        console.error("Failed to fetch commission rate:", error);
      }
    };

    fetchTax();
    fetchCommission();
  }, []);

  const columnDefs = [
    { headerName: "Items Name", field: "name", flex: 1 },
    { headerName: "Variant", field: "variant", flex: 1 },
    { headerName: "Quantity", field: "quantity", flex: 1, editable: true },
    {
      headerName: "Total (₱)",
      field: "totalItemPrice",
      flex: 1,
      valueFormatter: (params) => formatToPeso(params.value),
    },
  ];

  const rowData = [...orders.orderItems];

  const pinnedBottomRowData = [
    { name: "Subtotal", totalItemPrice: orders.orderTotal },
    { name: "Free Shipping", totalItemPrice: orders.deliveryFee },
    {
      name: `Tax (${(taxRate * 100).toFixed(0)}%)`,
      totalItemPrice: orders.orderTotal * taxRate,
    },
    {
      name: `Commission Rate (${(commissionRate * 100).toFixed(0)}%)`,
      totalItemPrice: orders.orderTotal * commissionRate,
    },
    {
      name: "Total",
      totalItemPrice:
        orders.orderTotal +
        orders.deliveryFee +
        orders.orderTotal * taxRate +
        orders.orderTotal * commissionRate,
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
