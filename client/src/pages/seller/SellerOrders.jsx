import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchOrdersByShopId } from "../../firebase/orders";
import { useStore } from "../../stores/useStore";
import { Toaster } from "react-hot-toast";
import { where } from "firebase/firestore";
import { getOrderStatusStyles } from "../../components/globalFunctions";
import { CustomRowActions } from "../../components/tables/CustomRowActions";
import { CustomHoverCopyCell } from "../../components/tables/CustomHoverCopyCell";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerOrders = () => {
  const { rowOrdersData, setRowOrdersData } = useStore();
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Order ID",
      field: "id",
      flex: 1,
      checkboxSelection: true,
      filter: "agTextColumnFilter",
      cellRenderer: CustomHoverCopyCell,
    },
    {
      headerName: "Date",
      field: "createdAtDate",
      filter: "agDateColumnFilter",
      flex: 1,
      sort: "desc",
      sortIndex: 0,
    },
    {
      headerName: "Customer",
      field: "shopper",
      flex: 2,
      filter: "agTextColumnFilter",
      valueGetter: (params) =>
        params.data.shopper ? params.data.shopper.email : "--",
      cellRenderer: CustomHoverCopyCell,
    },
    {
      headerName: "Quantity",
      field: "orderItems",
      flex: 1,
      filter: "agNumberColumnFilter",
      valueGetter: (params) =>
        params.data.orderItems ? params.data.orderItems.length : 0,
    },
    {
      headerName: "Total Price (₱)",
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
      filter: false,
      flex: 1,
      cellRenderer: CustomRowActions,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const filter = [where("orderStatus", "!=", "Delivered")];
      const orders = await fetchOrdersByShopId(filter);
      setRowOrdersData(orders);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className={"ag-theme-quartz p-5"} style={{ height: "90%" }}>
        <AgGridReact
          rowData={rowOrdersData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          domLayout="normal"
        />
      </div>
      <Toaster />
    </>
  );
};

export default SellerOrders;
