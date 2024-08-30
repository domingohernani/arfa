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

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProducts = () => {
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
        checkboxSelection: true,
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
    const fetchFurniture = async () => {
      try {
        let filter = [];
        filter.push(where("ownerId", "==", loggedUser.userId));
        const furnitures = await fetchFurnitureCollection("furnitures", filter);
        setRowFurnituresData(furnitures);
        console.log(furnitures);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    // const auth = getAuth();

    if (loggedUser) {
      fetchFurniture();
    }

    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //   } else {
    //     console.log("No user is logged in");
    //   }
    // });
    // return () => unsubscribe();
  }, [loggedUser]);

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
