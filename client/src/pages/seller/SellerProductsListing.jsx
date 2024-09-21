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

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProductsListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gridRef = useRef();
  const { loggedUser } = useStore();
  const { rowFurnituresData, setRowFurnituresData } = useStore();

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product ID",
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
        headerName: "Description",
        field: "description",
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Price (₱)",
        field: "price",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Created At",
        field: "createdAt",
        flex: 1,
        filter: "agDateColumnFilter",
        sort: "desc",
        sortIndex: 0,
        valueFormatter: (params) => {
          const createdAt = params.value;
          if (createdAt && createdAt.seconds) {
            const date = new Date(createdAt.seconds * 1000);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
          }
          return "";
        },
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
        cellRendererParams: (params) => {
          return {
            data: params.data,
            viewAction: true,
            viewFunc: handleViewOrder,
            editAction: true,
            deleteAction: true,
          };
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
        console.log(furnitures);

        setRowFurnituresData(furnitures);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    if (loggedUser && loggedUser.userId) {
      fetchFurniture();
    }
  }, [loggedUser]);

  const handleViewOrder = (value) => {
    navigate(`details/${value}`);
  };

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

export default SellerProductsListing;
