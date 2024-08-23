import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

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

const SellerProducts = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {
      product: "The Avalon Altar",
      category: "Storage",
      description: "A sleek, modern cabinet with ample storage.",
      inventory: "6 in stock",
      price: "₱ 4,490.00",
      rating: "5.0 (32 Votes)",
      createdAt: "2024-07-12",
      status: "On Sale",
    },
    {
      product: "The Windsor Whisper",
      category: "Living Room",
      description: "Comfortable chair perfect for any living room.",
      inventory: "6 in stock",
      price: "₱ 2,499.00",
      rating: "4.8 (24 Votes)",
      createdAt: "2024-06-18",
      status: "Not On Sale",
    },
    {
      product: "The Valencia Vista",
      category: "Dining Room",
      description: "Elegant dining table for modern spaces.",
      inventory: "8 in stock",
      price: "₱ 1,290.00",
      rating: "5.0 (54 Votes)",
      createdAt: "2024-07-01",
      status: "On Sale",
    },
    {
      product: "The Cambridge Cache",
      category: "Bedroom",
      description: "Stylish cabinet for bedroom storage.",
      inventory: "2 in stock",
      price: "₱ 3,490.00",
      rating: "4.5 (31 Votes)",
      createdAt: "2024-07-08",
      status: "Not On Sale",
    },
    {
      product: "The Avalon Accent",
      category: "Office",
      description: "Ergonomic office chair with a modern design.",
      inventory: "12 in stock",
      price: "₱ 1,990.00",
      rating: "4.9 (22 Votes)",
      createdAt: "2024-07-10",
      status: "On Sale",
    },
    {
      product: "The Seraphina Surface",
      category: "Accent",
      description: "A beautiful accent table to elevate your space.",
      inventory: "9 in stock",
      price: "₱ 1,890.00",
      rating: "5.0 (32 Votes)",
      createdAt: "2024-06-22",
      status: "Not On Sale",
    },
    {
      product: "The Meridian Marvel",
      category: "Entryway",
      description: "Modern storage cabinet for your entryway.",
      inventory: "5 in stock",
      price: "₱ 4,990.00",
      rating: "4.8 (24 Votes)",
      createdAt: "2024-07-15",
      status: "On Sale",
    },
    {
      product: "The Berkshire Breeze",
      category: "Outdoor",
      description: "Stylish outdoor chair for your garden.",
      inventory: "Out of Stock",
      price: "₱ 1,490.00",
      rating: "5.0 (54 Votes)",
      createdAt: "2024-07-03",
      status: "Not On Sale",
    },
  ]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product",
        field: "product",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Category",
        field: "category",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Description",
        field: "description",
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Inventory",
        field: "inventory",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Price",
        field: "price",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Rating",
        field: "rating",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Created At",
        field: "createdAt",
        flex: 1,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Status",
        field: "status",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Action",
        field: "action",
        filter: false,
        flex: 1,
        cellRenderer: CustomRowActions,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: "agTextColumnFilter", // Default filter
      floatingFilter: true, // Enable floating filter for each column
      resizable: true,
    }),
    []
  );

  return (
    <div
      className="p-5 ag-theme-quartz"
      style={{ height: "90%", width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        domLayout="normal"
        quickFilterText="" // For global search
      />
    </div>
  );
};

export default SellerProducts;
