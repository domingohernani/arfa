import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchTopSellers } from "../../firebase/shop";
import { Toaster } from "react-hot-toast";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TopSellers = ({ shopId }) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("weekly");

  const [columnDefs, setColumnDefs] = useState([
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
    },
    {
      headerName: "Action",
      field: "action",
      flex: 1,
      cellRendererFramework: (params) => (
        <button onClick={() => handleViewProduct(params.data.productId)}>
          View Details
        </button>
      ),
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      floatingFilter: true,
      sortable: true,
    }),
    []
  );

  const handleViewProduct = (productId) => {
    console.log("Viewing Product ID:", productId);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!shopId) return;
      const sellersData = await fetchTopSellers(shopId, timeFilter);
      setRowData(sellersData);
    };
    fetchData();
  }, [shopId, timeFilter]);

  return (
    <section className="p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">Best-Selling Products by Units Sold</p>
        <div className="flex items-center" style={{ width: "min(200px, 50%)" }}>
          <label
            htmlFor="timeFilter"
            className="flex items-center w-full gap-2 text-sm text-gray-900"
          >
            Time Period:
          </label>
          <select
            id="timeFilter"
            value={timeFilter}
            className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option> {/* New option added */}
          </select>
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
          paginationPageSizeSelector={[15, 25, 50]}
          domLayout="normal"
        />
      </div>
      <Toaster />
    </section>
  );
};

export default TopSellers;
