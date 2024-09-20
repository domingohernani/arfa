import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import { where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStore } from "../../stores/useStore";
import { Toaster } from "react-hot-toast";
import { CustomRowActions } from "../../components/tables/CustomRowActions";
import { CustomHoverCopyCell } from "../../components/tables/CustomHoverCopyCell";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProductInventory = () => {
  const location = useLocation();
  const gridRef = useRef();
  const { loggedUser } = useStore();
  const { rowFurnituresData, setRowFurnituresData } = useStore();

  const handleUpdateAction = (rowData) => {
    alert(rowData);
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "SKU",
        field: "id",
        flex: 1,
        filter: "agTextColumnFilter",
        cellRenderer: CustomHoverCopyCell,
      },
      {
        headerName: "Category",
        field: "category",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Name",
        field: "name",
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Quantity on Hand",
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
        headerName: "Updated At",
        field: "createdAtDate",
        flex: 2,
        filter: "agDateColumnFilter",
        sort: "desc",
        sortIndex: 0,
        valueFormatter: (params) => {
          if (params.value) {
            // Format the date to include both date and time
            const date = new Date(params.value);
            return date.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
          }
          return "";
        },
      },
      {
        headerName: "Action",
        field: "action",
        filter: false,
        flex: 1,
        cellRenderer: (params) => {
          return (
            <button
              className="px-3 py-1 text-sm bg-blue-500 rounded-sm btn-update"
              data-id={params.data.id}
              onClick={() => handleUpdateAction(params.data)}
            >
              <ArrowPathIcon className="inline-block w-4 h-4 mr-1" />
              <span className="text-sm">Update</span>
            </button>
          );
        },
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
    const fetchFurniture = async () => {
      try {
        let filter = [];
        filter.push(where("ownerId", "==", loggedUser.userId));
        const furnitures = await fetchFurnitureCollection("furnitures", filter);
        setRowFurnituresData(furnitures);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    if (loggedUser && loggedUser.userId) {
      fetchFurniture();
    }
  }, [loggedUser]);

  const isOutletPage = location.pathname.includes("/product-info/details/");

  return (
    <>
      {!isOutletPage ? (
        <>
          <div
            className="p-5 ag-theme-quartz"
            style={{ height: "max(600px, 90%)", width: "100%" }}
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
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default SellerProductInventory;
