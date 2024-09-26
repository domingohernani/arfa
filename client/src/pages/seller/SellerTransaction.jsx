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
  const { loggedUser } = useStore();
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
        field: "createdAt",
        flex: 2,
        filter: "agDateColumnFilter",
        valueGetter: (params) => {
          const createdAt = params.data.createdAt;
          if (createdAt && createdAt.seconds) {
            return new Date(createdAt.seconds * 1000);
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
      {
        headerName: "Name",
        field: "shopper",
        flex: 2,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const shopper = params.data.shopper;
          if (!params.data && !shopper) return "---";
          return `${shopper.firstName} ${shopper.lastName}`;
        },
        cellRenderer: CustomHoverCopyCell,
      },
      {
        headerName: "Location",
        field: "location",
        flex: 2,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const shopper = params.data.shopper;
          if (!params.data && !shopper) return "---";
          return `${shopper.location.barangay}, ${shopper.location.city}, ${shopper.location.province}, ${shopper.location.region}`;
        },
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
        cellRendererParams: (params) => {
          return {
            data: params.data,
            viewAction: true,
            editAction: false,
            deleteAction: true,
          };
        },
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
        where("shopId", "==", loggedUser.userId),
      ];
      const orders = await fetchOrdersByShopId(filter);
      console.log(orders);

      setRowTransactionsData(orders);
    };
    if (loggedUser && loggedUser.userId) {
      fetchOrders();
    }
  }, [loggedUser]);

  return (
    <>
      <div
        className="p-5 ag-theme-quartz"
        style={{ height: "max(600px, 90%)", width: "100%" }}
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
