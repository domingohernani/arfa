import React, { useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { fetchOrdersByShopId } from "../../firebase/orders";
import { useStore } from "../../stores/useStore";
import { where } from "firebase/firestore";
import { getOrderStatusStyles } from "../../components/globalFunctions";
import { Toaster } from "react-hot-toast";
import { CustomRowActions } from "../../components/tables/CustomRowActions";
import { CustomHoverCopyCell } from "../../components/tables/CustomHoverCopyCell";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerTransaction = () => {
  const { rowTransactionsData, setRowTransactionsData } = useStore();
  const gridRef = useRef();

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Transaction Number",
        field: "id",
        flex: 1,
        filter: "agTextColumnFilter",
        cellRenderer: CustomHoverCopyCell,
      },
      {
        headerName: "Date",
        // field: "shopper",
        flex: 2,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Name",
        field: "shopper",
        flex: 2,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const shopper = params.data.shopper;
          if (!params.data && !shopper) return "---";
          return `${shopper.firstname} ${shopper.lastname}`;
        },
        cellRenderer: CustomHoverCopyCell,
      },
      {
        headerName: "Location",
        field: "location",
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Quantity",
        field: "orders",
        flex: 1,
        filter: "agNumberColumnFilter",
        valueGetter: (params) =>
          params.data.orderItems ? params.data.orderItems.length : 0,
      },
      {
        headerName: "Spent",
        field: "orderTotal",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Status",
        field: "orderStatus",
        flex: 1,
        filter: "agTextColumnFilter",
        cellRenderer: (params) => {
          const { statusText, colorClass, bgColorClass } = getOrderStatusStyles(
            params.value
          );
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
        headerName: "Action",
        field: "action",
        flex: 1,
        cellRenderer: CustomRowActions,
        filter: false,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true, // Default filter
      floatingFilter: true, // Enable floating filter for each column
      resizable: true,
    }),
    []
  );

  useEffect(() => {
    const fetchOrders = async () => {
      const filter = [
        where("orderStatus", "in", [
          "Delivered",
          "Cancelled",
          "Returned",
          "Refunded",
          "Unknown",
        ]),
      ];
      const orders = await fetchOrdersByShopId(filter);
      setRowTransactionsData(orders);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div
        className="p-5 ag-theme-quartz"
        style={{ height: "90%", width: "100%" }}
      >
        <AgGridReact
          rowData={rowTransactionsData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          domLayout="normal"
          quickFilterText=""
        />
      </div>
      <Toaster />
    </>
  );
};

export default SellerTransaction;
