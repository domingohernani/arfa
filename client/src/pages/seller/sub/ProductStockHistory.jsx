import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { getStocks } from "../../../firebase/stock";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { UpdateStock } from "../../../components/modals/UpdateStock";
import { ArrowPathIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const ProductStockHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stocks, setStocks] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stockData = await getStocks(id);
        setStocks(stockData.stocks);
        setVariants(stockData.variants);
        setFilteredStocks(stockData.stocks);
        if (stockData.variants.length > 0) {
          setSelectedVariant(stockData.variants[0].name);
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [id, isUpdateSuccess]);

  useEffect(() => {
    if (selectedVariant) {
      const filtered = stocks.filter(
        (stock) => stock.variant === selectedVariant
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(stocks);
    }
  }, [selectedVariant, stocks]);

  const columnDefs = useMemo(
    () => [
      { headerName: "Product ID", field: "id", flex: 1 },
      { headerName: "Old Quantity", field: "oldQuantity", flex: 1 },
      { headerName: "New Quantity", field: "newQuantity", flex: 1 },
      { headerName: "Quantity Changed", field: "quantityAdded", flex: 1 },
      {
        headerName: "Updated At",
        field: "updatedAt",
        flex: 2,
        sort: "desc",
        sortIndex: 0,
        valueGetter: (params) => {
          const updatedAt = params.data.updatedAt;
          return updatedAt ? new Date(updatedAt.seconds * 1000) : null;
        },
        valueFormatter: (params) => {
          const date = params.value;
          if (date instanceof Date) {
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
          }
          return "";
        },
      },
      // {
      //   headerName: "Action",
      //   field: "action",
      //   filter: false,
      //   flex: 2,
      //   cellRenderer: (params) => {
      //     return (
      //       <section className="flex items-center justify-center gap-2 px-2 mt-1">
      //         <button
      //           className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
      //           data-id={params.data.id}
      //           onClick={() => handleUpdateAction(params.data)}
      //         >
      //           <ArrowPathIcon className="inline-block w-4 h-4 mr-1" />
      //           <span className="text-sm">Update</span>
      //         </button>
      //       </section>
      //     );
      //   },
      // },
    ],
    []
  );

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdateAction = () => {
    setUpdateId(stocks[0]?.id);
    setCurrentStock(stocks[0]?.newQuantity || 0);
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

  return (
    <div className="m-5">
      {/* Navigation */}
      <nav className="flex items-center gap-2 mb-5">
        <div className="p-1 w-fit">
          <ArrowLeftIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/seller-page/product-stock")}
          />
        </div>
        <div className="flex items-center gap-2">
          <h6
            className="cursor-pointer hover:text-arfagreen"
            onClick={() => navigate("/seller-page/product-stock")}
          >
            Stock
          </h6>
          <h6 className="cursor-pointer">/</h6>
          <h6 className="cursor-pointer hover:text-arfagreen">Furniture</h6>
        </div>
      </nav>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-2 my-3">
        {variants.some((variant) => variant.name !== "") && (
          <>
            <div className="flex items-center justify-between">
              <label
                htmlFor="variant"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Variant
              </label>
            </div>
            <select
              name="variant"
              id="variant"
              className="bg-gray-50 w-fit border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block p-2.5"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)} // Update selected variant
            >
              {variants.map((variant, index) => (
                <option key={index} value={variant.name}>
                  {variant.name}
                </option>
              ))}
            </select>
            <Tooltip content="Select a variant to filter stocks">
              <QuestionMarkCircleIcon
                className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                aria-hidden="true"
              />
            </Tooltip>
          </>
        )}

        <section className="flex items-center justify-center gap-2 ml-auto">
          <button
            className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
            // onClick={() => handleUpdateAction(params.data)}
            onClick={handleUpdateAction}
          >
            <ArrowPathIcon className="inline-block w-4 h-4 mr-1" />
            <span className="text-sm">Update</span>
          </button>
        </section>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-quartz" style={{ height: 600 }}>
        {!loading && (
          <AgGridReact
            rowData={filteredStocks} // Use filtered stocks as rowData
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
            pagination={true}
            paginationPageSize={15}
            paginationPageSizeSelector={[15, 25, 50]}
            domLayout="normal"
          />
        )}
      </div>
      {modalOpen && (
        <UpdateStock
          id={id}
          currentStock={currentStock}
          isOpen={modalOpen}
          close={closeModal}
          updateResultMessage={updateResultMessage}
          selectedVariant={selectedVariant}
        />
      )}
    </div>
  );
};

export default ProductStockHistory;
