import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { getStocks } from "../../../firebase/stock";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const ProductStockHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stocks, setStocks] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

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
      { headerName: "Variant", field: "variant", flex: 1 }, // Assuming each stock has a 'variant' field
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
    ],
    []
  );

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
    </div>
  );
};

export default ProductStockHistory;
