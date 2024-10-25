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
import toast, { Toaster } from "react-hot-toast";
import { CustomRowActions } from "../../components/tables/CustomRowActions";
import { CustomHoverCopyCell } from "../../components/tables/CustomHoverCopyCell";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowPathIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { UpdateStock } from "../../components/modals/UpdateStock";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProductStock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gridRef = useRef();
  const { loggedUser } = useStore();
  const { rowFurnituresData, setRowFurnituresData } = useStore();
  const [id, setId] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleUpdateAction = (rowData) => {
    setId(rowData.id);
    setCurrentStock(rowData.stock);
    setModalOpen(true);
  };

  const updateResultMessage = (message, isSuccess) => {
    if (isSuccess) {
      setIsUpdateSuccess(!isUpdateSuccess);
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
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
        flex: 3,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Quantity on Hand",
        field: "stock",
        flex: 1,
        filter: "agTextColumnFilter",
        cellRenderer: (params) => {
          const stock = params.value;

          let statusText;
          let colorClass;
          let bgColorClass;

          // Determine stock status and corresponding color
          if (stock <= 5) {
            statusText = "Few";
            colorClass = "text-red-600"; // Red for "Few"
            bgColorClass = "bg-red-600";
          } else if (stock <= 20) {
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
                ({stock}) {statusText}
              </span>
              <div className={`w-3 h-3 rounded-full ${bgColorClass}`}></div>
            </div>
          );
        },
      },
      {
        headerName: "Updated At",
        field: "stockUpdatedAt",
        flex: 2,
        filter: "agDateColumnFilter",
        sort: "desc",
        sortIndex: 0,
        valueGetter: (params) => {
          const stockUpdatedAt = params.data.stockUpdatedAt;
          if (stockUpdatedAt && stockUpdatedAt.seconds) {
            return new Date(stockUpdatedAt.seconds * 1000);
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
        headerName: "Action",
        field: "action",
        filter: false,
        flex: 2,
        cellRenderer: (params) => {
          return (
            <section className="flex items-center justify-center gap-2 px-2 mt-1">
              <button
                className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
                data-id={params.data.id}
                onClick={() => handleUpdateAction(params.data)}
              >
                <ArrowPathIcon className="inline-block w-4 h-4 mr-1" />
                <span className="text-sm">Update</span>
              </button>
              <button
                className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
                onClick={() => {
                  navigate(`furniture/${params.data.id}`);
                }}
              >
                <RectangleStackIcon className="inline-block w-4 h-4 mr-1" />
                <span className="text-sm">History</span>
              </button>
            </section>
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
  }, [loggedUser, isUpdateSuccess]);

  const isOutletPage = location.pathname.includes("/product-stock/furniture/");

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
          {modalOpen && id && currentStock && (
            <UpdateStock
              id={id}
              currentStock={currentStock}
              isOpen={modalOpen}
              close={closeModal}
              updateResultMessage={updateResultMessage}
            />
          )}
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default SellerProductStock;
