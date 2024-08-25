import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from "../../components/CustomButton";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { fetchOrdersByShopId } from "../../firebase/orders";
import { useStore } from "../../stores/useStore";
import { where } from "firebase/firestore";
import { getOrderStatusStyles } from "../../components/globalFunctions";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const CustomRowActions = ({ data }) => {
  return (
    <Menu as="div" className="relative inline-block w-full text-center ">
      <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 bg-transparent hover:border-transparent group hover:text-gray-900">
        <EllipsisVerticalIcon className="text-arfablack size-4" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem
          as="div"
          className="flex items-center"
          onClick={() => {
            alert(data.shopperId);
          }}
        >
          <button className="group flex w-full items-center gap-2 text-arfablack rounded-lg py-1.5 px-3 justify-between">
            <div className="flex items-center gap-2">
              <EyeIcon className="text-gray-500 size-4" />
              <span className="text-sm font-medium cursor-pointer">View</span>
            </div>
            <span className="hidden text-sm text-gray-500 transition-opacity opacity-0 duration-900 group-hover:inline group-hover:opacity-100">
              ⌘V
            </span>
          </button>
        </MenuItem>

        <MenuItem
          as="div"
          className="flex items-center"
          onClick={() => {
            alert(data.shopperId);
          }}
        >
          <button className="group flex w-full items-center gap-2 text-arfablack rounded-lg py-1.5 px-3 justify-between">
            <div className="flex items-center gap-2">
              <PencilIcon className="text-gray-500 size-4" />
              <span className="text-sm font-medium cursor-pointer">Edit</span>
            </div>
            <span className="hidden text-sm text-gray-500 group-hover:inline">
              ⌘E
            </span>
          </button>
        </MenuItem>
        <MenuItem
          as="div"
          className="flex items-center"
          onClick={() => {
            alert(data.shopperId);
          }}
        >
          <button className="group flex w-full items-center gap-2 text-arfablack rounded-lg py-1.5 px-3 justify-between">
            <div className="flex items-center gap-2">
              <TrashIcon className="text-gray-500 size-4" />
              <span className="text-sm font-medium cursor-pointer">Delete</span>
            </div>
            <span className="hidden text-sm text-gray-500 transition-opacity opacity-0 duration-900 group-hover:inline group-hover:opacity-100">
              ⌘D
            </span>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

const SellerTransaction = () => {
  const { rowTransactionsData, setRowTransactionsData } = useStore();
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {
      transactionNumber: "TXN1234567890",
      name: "Jalen Villaflor",
      location: "Binalonan, Pangasinan",
      orders: 5,
      spent: "₱ 5628.80",
    },
    {
      transactionNumber: "TXN0987654321",
      name: "Jeffrey Saguico",
      location: "San Manuel, Pangasinan",
      orders: 12,
      spent: "₱ 25946.75",
    },
    {
      transactionNumber: "TXN1122334455",
      name: "Cristine Basada",
      location: "Laoac, Pangasinan",
      orders: 6,
      spent: "₱ 19650.12",
    },
    {
      transactionNumber: "TXN5566778899",
      name: "Lexi Estandian",
      location: "Bani, Pangasinan",
      orders: 3,
      spent: "₱ 10058.35",
    },
    {
      transactionNumber: "TXN1029384756",
      name: "Hanz Decano",
      location: "Urdaneta, Pangasinan",
      orders: 15,
      spent: "₱ 32654.03",
    },
    {
      transactionNumber: "TXN5647382910",
      name: "Arvin Regata",
      location: "Umingan, Pangasinan",
      orders: 12,
      spent: "₱ 45651.79",
    },
    {
      transactionNumber: "TXN1928374655",
      name: "Joshua Abundiente",
      location: "Binalonan, Pangasinan",
      orders: 5,
      spent: "₱ 16235.56",
    },
    {
      transactionNumber: "TXN8172635409",
      name: "Charles Inso",
      location: "Mangaldan, Pangasinan",
      orders: 7,
      spent: "₱ 36589.25",
    },
  ]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Transaction Number",
        field: "id",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Date",
        // field: "shopper",
        flex: 1,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Name",
        field: "shopper",
        flex: 2,
        filter: "agTextColumnFilter",
        valueGetter: (params) =>
          params.data.shopper ? params.data.shopper.email : "--",
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
      console.log(orders);
      setRowTransactionsData(orders);
    };
    fetchOrders();
  }, []);

  return (
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
        domLayout="normal"
        quickFilterText=""
      />
    </div>
  );
};

export default SellerTransaction;
