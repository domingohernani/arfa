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
import { useEffect } from "react";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import { getLoggedShopInfo, getUserInfo } from "../../firebase/user";
import { where } from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

const SellerProducts = () => {
  const gridRef = useRef();

  const { rowFurnituresData, setRowFurnituresData } = useStore();

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product ID",
        field: "id",
        flex: 1,
        filter: "agTextColumnFilter",
        checkboxSelection: true,
        cellRenderer: HoverCopyCellRenderer,
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
        cellRenderer: (params) => {
          const inventory = params.value;

          let statusText;
          let colorClass;
          let bgColorClass;

          // Determine inventory status and corresponding color
          if (inventory <= 5) {
            statusText = "Few";
            colorClass = "text-red-600"; // Red for "Few"
            bgColorClass = "bg-red-600";
          } else if (inventory <= 20) {
            statusText = "Normal";
            colorClass = "text-yellow-300"; // Yellow for "Normal"
            bgColorClass = "bg-yellow-300";
          } else {
            statusText = "High";
            colorClass = "text-green-600"; // Green for "High"
            bgColorClass = "bg-green-600";
          }

          return (
            <div className="flex items-center justify-between">
              <span className={`font-bold ${colorClass} font-normal`}>
                ({inventory}) {statusText}
              </span>
              <div className={`w-3 h-3 rounded-full ${bgColorClass}`}></div>
            </div>
          );
        },
      },
      {
        headerName: "Price (₱)",
        field: "price",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Created At",
        field: "createdAtDate",
        flex: 1,
        filter: "agDateColumnFilter",
        sort: "desc",
        sortIndex: 0,
      },
      {
        headerName: "Status",
        field: "isSale",
        flex: 1,
        filter: "agTextColumnFilter",
        cellRenderer: (params) => {
          const isOnSale = params.value;

          let statusText;
          let colorClass;
          let bgColorClass;

          // Determine status and corresponding colors
          if (isOnSale) {
            statusText = "On Sale";
            colorClass = "text-blue-600"; // Blue for "On Sale"
            bgColorClass = "bg-blue-600"; // Blue background for the indicator
          } else {
            statusText = "Not On Sale";
            colorClass = "text-green-500"; // Green for "Not On Sale"
            bgColorClass = "bg-green-500"; // Green background for the indicator
          }

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
    ],
    []
  );

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
    };
  }, []);

  useEffect(() => {
    const fetchFurniture = async (userId) => {
      try {
        let filter = [];
        filter.push(where("ownerId", "==", userId));
        const furnitures = await fetchFurnitureCollection("furnitures", filter);
        setRowFurnituresData(furnitures);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFurniture(user.uid);
      } else {
        console.log("No user is logged in");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div
        className="p-5 ag-theme-quartz"
        style={{ height: "90%", width: "100%" }}
      >
        <AgGridReact
          rowData={rowFurnituresData}
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

export default SellerProducts;
