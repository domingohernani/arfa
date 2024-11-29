import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import {
  deleteFurniture,
  deleteFurnitures,
  fetchFurnitureCollection,
} from "../../firebase/furniture";
import { where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStore } from "../../stores/useStore";
import toast, { Toaster } from "react-hot-toast";
import { CustomRowActions } from "../../components/tables/CustomRowActions";
import { CustomHoverCopyCell } from "../../components/tables/CustomHoverCopyCell";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DeleteProductModal } from "../../components/modals/DeleteProductModal";
import { formatToPeso } from "../../components/globalFunctions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeleteMultipleProductModal } from "../../components/modals/DeleteMultipleProductModal";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProductsListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gridRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [productDeletionModal, setProductDeletionModal] = useState(false);
  const [furnitureName, setFurnitureName] = useState("");
  const [furnitureId, setFurnitureId] = useState("");
  const [hasSelectedRows, setHasSelectedRows] = useState(false); // Track if rows are selected
  const { loggedUser } = useStore();
  const { rowFurnituresData, setRowFurnituresData } = useStore();

  const columnDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
        floatingFilter: false,
      },
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
        valueFormatter: (params) => {
          if (params.value != null) {
            return formatToPeso(params.value);
          }
          return "";
        },
      },
      {
        headerName: "Created At",
        field: "createdAt",
        flex: 1,
        filter: "agDateColumnFilter",
        sort: "desc",
        sortIndex: 0,
        valueGetter: (params) => {
          const createdAt = params.data.createdAt;
          if (createdAt && createdAt.seconds) {
            return new Date(createdAt.seconds * 1000);
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
            viewFunc: handleViewProduct,
            editAction: false,
            deleteAction: true,
            deleteFunc: handleDeleteProduct,
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

  useEffect(() => {
    if (loggedUser && loggedUser.userId) {
      fetchFurniture();
    }
  }, [loggedUser]);

  const handleViewProduct = (value) => {
    navigate(`details/${value}`);
  };

  const handleDeleteProduct = (value) => {
    setFurnitureName(value.name);
    setFurnitureId(value.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeMultiModal = () => {
    setProductDeletionModal(false);
  };

  const deleteProduct = async () => {
    try {
      const result = await deleteFurniture(furnitureId);
      if (result) {
        fetchFurniture();
        toast.success("Furniture deleted successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error deleting furniture. Please try again.");
    }
  };

  const multiDeleteProduct = async () => {
    try {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedIds = selectedNodes.map((node) => node.data.id);

      if (selectedIds.length === 0) {
        toast.error("No products selected for deletion.");
        return;
      }

      await deleteFurnitures(selectedIds);

      fetchFurniture();

      toast.success("Selected products deleted successfully!");
    } catch (error) {
      console.error("Error deleting products: ", error);
      toast.error("Failed to delete selected products. Please try again.");
    }
  };

  // Handle row selection changes
  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    setHasSelectedRows(selectedNodes.length > 0); // Update the state based on selection
  };

  const isOutletPage = location.pathname.includes("/product-info/details/");

  return (
    <>
      {!isOutletPage ? (
        <>
          {modalOpen ||
            (productDeletionModal && (
              <>
                <DeleteProductModal
                  isOpen={modalOpen}
                  close={closeModal}
                  name={furnitureName}
                  deleteProduct={deleteProduct}
                />
                <DeleteMultipleProductModal
                  isOpen={productDeletionModal}
                  close={closeMultiModal}
                  name={"these products"}
                  deleteProduct={multiDeleteProduct}
                />
              </>
            ))}
          <div
            className="p-5 ag-theme-quartz"
            style={{ height: "max(600px, 90%)", width: "100%" }}
          >
            {/* Conditionally render the button */}
            {hasSelectedRows && (
              <div className="flex">
                <button
                  onClick={() => {
                    setProductDeletionModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 mb-4 text-white rounded bg-arfagreen"
                >
                  <TrashIcon className="w-5 h-5 text-white" />
                  <span>Delete</span>
                </button>
              </div>
            )}
            <AgGridReact
              rowData={rowFurnituresData}
              ref={gridRef}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              pagination={true}
              paginationPageSize={15}
              paginationPageSizeSelector={[15, 25, 50]}
              domLayout="normal"
              onSelectionChanged={onSelectionChanged} // Add selection change handler
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
