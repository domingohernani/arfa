import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import { where } from "firebase/firestore";
import { useStore } from "../../stores/useStore";
import toast, { Toaster } from "react-hot-toast";
import { UpdateStock } from "../../components/modals/UpdateStock";
import { getStocks } from "../../firebase/stock";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RectangleStackIcon } from "@heroicons/react/24/outline";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProductStock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gridRef = useRef();
  const { loggedUser } = useStore();
  const { furnitureStocks, setFurnitureStocks } = useStore();
  const [id, setId] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  const handleUpdateAction = (rowData) => {
    setId(rowData.id);
    setCurrentStock(rowData.stocks[0].newQuantity);
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

  const getTotalStock = (data) => {
    const hasValidVariants =
      data.variants &&
      data.variants.some(
        (variant) => variant.name.trim() && variant.imagePaths.length > 0
      );

    if (hasValidVariants) {
      const totalVariantStock = data.variants.reduce((total, variant) => {
        if (variant.name.trim() && variant.imagePaths.length > 0) {
          return total + (variant.stock || 0);
        }
        return total;
      }, 0);

      return totalVariantStock;
    } else {
      return data.stock || 0;
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
        flex: 1,
        filter: "agTextColumnFilter",
        cellRenderer: (params) => {
          const stocks = getTotalStock(params.data);
          if (stocks) {
            const stock = stocks;

            let statusText;
            let colorClass;
            let bgColorClass;

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
          } else {
            return (
              <div className="flex items-center justify-between">
                <span className="font-normal text-gray-600">---</span>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
            );
          }
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

  const filteredFurnitureStocks = useMemo(() => {
    if (filterOption === "low") {
      return furnitureStocks.filter((item) => getTotalStock(item) <= 5);
    }
    return furnitureStocks;
  }, [furnitureStocks, filterOption]);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        let filter = [];
        filter.push(where("ownerId", "==", loggedUser.userId));
        const furnitures = await fetchFurnitureCollection("furnitures", filter);

        const furnituresWithStocks = await Promise.all(
          furnitures.map(async (furniture) => {
            const { stocks } = await getStocks(furniture.id);
            return { ...furniture, stocks };
          })
        );

        setFurnitureStocks(furnituresWithStocks);
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
          <div className="flex flex-col px-5 pt-5">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-fit p-2.5"
            >
              <option value="all">All Stocks</option>
              <option value="low">Low Stock (≤ 5)</option>
            </select>
          </div>
          <div
            className="p-5 ag-theme-quartz"
            style={{ height: "max(600px, 90%)", width: "100%" }}
          >
            <AgGridReact
              rowData={filteredFurnitureStocks}
              ref={gridRef}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              pagination={true}
              paginationPageSize={15}
              paginationPageSizeSelector={[15, 25, 50]}
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
