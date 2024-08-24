import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchOrdersByShopId } from "../../firebase/orders";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "../../stores/useStore";
import toast, { Toaster } from "react-hot-toast";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const HoverCopyCellRenderer = ({ value }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleCellClick = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleCopyClick = async () => {
    if (isVisible) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
          toast.success(`Copied "${value}" to clipboard!`);
        } else {
          toast.error("Clipboard API is not available in this browser.");
        }
      } catch (err) {
        toast.error("Failed to copy.");
      }
    }
  };

  return (
    <div
      className="relative"
      onClick={handleCellClick}
      onMouseLeave={handleMouseLeave}
    >
      <span>{value}</span>
      <div
        className={`absolute top-0 left-0 z-50 p-2 text-xs text-white bg-gray-800 rounded shadow-lg cursor-pointer w-fit transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleCopyClick}
      >
        {`Copy`}
      </div>
    </div>
  );
};

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
      cellRenderer: HoverCopyCellRenderer,
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
      flex: 1,
      filter: "agTextColumnFilter",
      valueGetter: (params) =>
        params.data.shopper ? params.data.shopper.email : "--",
      cellRenderer: HoverCopyCellRenderer,
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
      const orders = await fetchOrdersByShopId();
      setRowOrdersData(orders);
      console.log(orders);
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
