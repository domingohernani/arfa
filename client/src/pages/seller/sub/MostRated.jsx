import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { where } from "firebase/firestore";
import { fetchFurnitureCollection } from "../../../firebase/furniture";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { calculateRatingSummary } from "../../../components/globalFunctions";
import {
  EyeIcon,
  ArrowDownOnSquareStackIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

const MostRated = ({ shopId }) => {
  const navigate = useNavigate();
  const gridRef = useRef();
  const [rowFurnituresData, setRowFurnituresData] = useState([]);
  const [csvContent, setCsvContent] = useState("");
  const [toggleShowCSV, setToggleShowCSV] = useState(false);
  const [filterType, setFilterType] = useState("best"); // "best" for Best Rated, "worst" for Worst Rated

  const handleMoreAction = (rowData) => {
    navigate(`/seller-page/product-reviews/furniture/${rowData.id}`);
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
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Total Reviews",
        field: "reviews",
        flex: 1,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const rating = calculateRatingSummary(params.data.reviewsData || {});
          return rating.numberOfRatings + " review(s)";
        },
      },
      {
        headerName: "Average Rating",
        field: "reviews",
        flex: 1,
        filter: "agTextColumnFilter",
        valueGetter: (params) => {
          const rating = calculateRatingSummary(params.data.reviewsData || {});
          return rating.average + " star(s)";
        },
      },
      {
        headerName: "Action",
        field: "action",
        filter: false,
        flex: 1,
        cellRenderer: (params) => (
          <button
            className="px-3 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
            data-id={params.data.id}
            onClick={() => handleMoreAction(params.data)}
          >
            <EyeIcon className="inline-block w-4 h-4 mr-1" />
            <span className="text-sm">More</span>
          </button>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
    }),
    []
  );

  const handleExport = () => {
    gridRef.current.api.exportDataAsCsv({
      processCellCallback: (params) => {
        if (params.column.getColId() === "action") {
          return null;
        }
        return params.value;
      },
    });
  };

  const handleToggleCsvContent = () => {
    if (toggleShowCSV) {
      setCsvContent("");
      setToggleShowCSV(false);
    } else {
      const csvData = gridRef.current.api.getDataAsCsv({
        processCellCallback: (params) => {
          if (params.column.getColId() === "action") {
            return null;
          }
          return params.value;
        },
      });
      setCsvContent(csvData);
      setToggleShowCSV(true);
    }
  };

  const fetchFurniture = async () => {
    try {
      const filter = [where("ownerId", "==", shopId)];
      const furnitures = await fetchFurnitureCollection("furnitures", filter);
      const sortedFurnitures = furnitures.sort((a, b) => {
        const ratingA = calculateRatingSummary(a.reviewsData || {}).average;
        const ratingB = calculateRatingSummary(b.reviewsData || {}).average;

        // Sort based on filterType: "best" for descending, "worst" for ascending
        return filterType === "best" ? ratingB - ratingA : ratingA - ratingB;
      });
      setRowFurnituresData(sortedFurnitures);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    }
  };

  useEffect(() => {
    if (shopId) {
      fetchFurniture();
    }
  }, [shopId, filterType]); // Re-fetch data whenever filterType changes

  useEffect(() => {
    if (toggleShowCSV) {
      const csvData = gridRef.current.api.getDataAsCsv({
        processCellCallback: (params) => {
          if (params.column.getColId() === "action") {
            return null;
          }
          return params.value;
        },
      });
      setCsvContent(csvData);
    }
  }, [rowFurnituresData]);

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">Most Rated Products</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="filterType" className="text-sm font-medium">
              Filter:
            </label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen p-2.5"
            >
              <option value="best">Best Rated</option>
              <option value="worst">Worst Rated</option>
            </select>
          </div>

          <button
            onClick={handleToggleCsvContent}
            className="flex text-arfablack items-center border-gray-300 border justify-center gap-1 bg-arfagray font-medium rounded-md text-sm px-2 py-2.5 text-center"
          >
            {toggleShowCSV ? (
              <>
                <span>Hide</span>
                <EyeSlashIcon className="w-5 h-5 text-black" />
              </>
            ) : (
              <>
                <span>Show</span>
                <EyeIcon className="w-5 h-5 text-black" />
              </>
            )}
          </button>
          <button
            onClick={handleExport}
            className="text-white flex min-w-max items-center justify-center gap-1 bg-arfagreen font-medium rounded-md text-sm px-2 py-2.5 text-center"
          >
            <ArrowDownOnSquareStackIcon className="w-5 h-5 text-white" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: "600px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowFurnituresData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={15}
          domLayout="normal"
          suppressRowClickSelection={true}
        />
      </div>
      {toggleShowCSV && (
        <div className="mt-4">
          <textarea
            value={csvContent}
            readOnly
            placeholder="CSV content will appear here when you click 'Show CSV Content'"
            className="h-40 bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
          />
        </div>
      )}
      <Toaster />
    </section>
  );
};

export default MostRated;
