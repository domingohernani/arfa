import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import StockHistoryTable from "../../../components/tables/StockHistoryTable";
import { getStocks } from "../../../firebase/stock";

const ProductStockHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stockData = await getStocks(id);
        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="m-5">
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

      <main className="mt-5">
        {!loading && <StockHistoryTable stocks={stocks} />}
      </main>
    </div>
  );
};

export default ProductStockHistory;
