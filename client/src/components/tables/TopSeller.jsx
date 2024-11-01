import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchTopSellers } from "../../firebase/shop";
import { Toaster } from "react-hot-toast";
import {
  ArrowDownOnSquareStackIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { formatToPeso } from "../globalFunctions";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);
const TopSellers = ({ shopId }) => {
  const navigate = useNavigate();
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("weekly");
  const [csvContent, setCsvContent] = useState("");
  const [toggleShowCSV, setToggleShowCSV] = useState(false);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product ID",
        field: "productId",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Product Name",
        field: "name",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Units Sold",
        field: "unitsSold",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Revenue (₱)",
        field: "revenue",
        flex: 1,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => formatToPeso(params.value),
      },
      {
        headerName: "Action",
        colId: "action",
        flex: 1,
        cellRenderer: (params) => {
          return (
            <section className="flex items-center justify-center gap-2 px-2 mt-1">
              <button
                className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
                onClick={() => handleViewClick(params.data, timeFilter)}
              >
                <EyeIcon className="inline-block w-4 h-4 mr-1" />
                <span className="text-sm">View {timeFilter}</span>
              </button>
            </section>
          );
        },
      },
    ],
    [timeFilter]
  );

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      floatingFilter: true,
      sortable: true,
    }),
    []
  );

  const handleViewClick = (data, filter) => {
    navigate(
      `/seller-page/report/furniture-transaction/${data.productId}?filter=${filter}`
    );
  };

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
      // Hide the CSV content if it's currently shown
      setCsvContent("");
      setToggleShowCSV(false);
    } else {
      // Show and fetch the CSV content if it's currently hidden
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

  useEffect(() => {
    const fetchData = async () => {
      if (!shopId) return;
      const sellersData = await fetchTopSellers(shopId, timeFilter);
      setRowData(sellersData);
    };
    fetchData();
  }, [shopId, timeFilter]);

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
  }, [rowData]);

  return (
    <section className="p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">
          Best-Selling Products by Units Sold
        </p>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2"
            style={{ width: "min(250px, 50%)" }}
          >
            <label
              htmlFor="timeFilter"
              className="flex items-center flex-1 gap-2 text-sm text-gray-900 "
            >
              Time Period:
            </label>
            <select
              id="timeFilter"
              value={timeFilter}
              className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block p-2.5"
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <button
            onClick={handleToggleCsvContent}
            className="flex text-arfablack items-center border-gray-300 border justify-center gap-1 bg-arfagray font-medium rounded-md text-sm px-2 py-2.5 text-center"
          >
            {toggleShowCSV ? (
              <>
                <span>Show</span>
                <EyeIcon className="w-5 h-5 text-black" />
              </>
            ) : (
              <>
                <span>Hide</span>
                <EyeSlashIcon className="w-5 h-5 text-black" />
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
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={15}
          domLayout="normal"
          suppressRowClickSelection={true}
          paginationPageSizeSelector={[15, 25, 50]}
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

export default TopSellers;
