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
import { calculateRatingSummary } from "../../components/globalFunctions";
import { EyeIcon } from "@heroicons/react/20/solid";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProductReviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gridRef = useRef();
  const { loggedUser } = useStore();
  const { rowFurnituresData, setRowFurnituresData } = useStore();

  const handleMoreAction = (rowData) => {
    navigate(`furniture/${rowData.id}`);
  };

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
        headerName: "Total Reviews",
        field: "reviews",
        flex: 1,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const rating = calculateRatingSummary(params.data.reviewsData);
          return rating.numberOfRatings + " review(s)";
        },
      },
      {
        headerName: "Average Rating",
        field: "reviews",
        flex: 1,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const rating = calculateRatingSummary(params.data.reviewsData);
          return rating.average + " star(s)";
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
              onClick={() => handleMoreAction(params.data)}
            >
              <EyeIcon className="inline-block w-4 h-4 mr-1" />
              <span className="text-sm">More</span>
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

  const handleViewOrder = (value) => {
    navigate(`details/${value}`);
  };

  const isOutletPage = location.pathname.includes("/product-reviews/furniture/");

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

export default SellerProductReviews;
