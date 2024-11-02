import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import {
  ArrowDownOnSquareStackIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { db } from "../../../firebase/firebase";
import { formatToPeso } from "../../../components/globalFunctions";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

const YearlyRevenue = ({ shopId }) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [csvContent, setCsvContent] = useState("");
  const [toggleShowCSV, setToggleShowCSV] = useState(false);

  const columnDefs = useMemo(
    () => [
      { headerName: "Year", field: "year", flex: 1, sortable: true },
      {
        headerName: "Total Revenue (₱)",
        field: "totalRevenue",
        flex: 1,
        valueFormatter: (params) => formatToPeso(params.value),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      floatingFilter: true,
      sortable: true,
    }),
    []
  );

  const fetchYearlyRevenue = async () => {
    try {
      // Query orders that belong to the specified shop and have been "Delivered" or "Picked-up"
      const ordersRef = collection(db, "orders");
      const ordersQuery = query(
        ordersRef,
        where("shopId", "==", shopId),
        where("orderStatus", "in", ["Delivered", "Picked-up"])
      );
      const ordersSnapshot = await getDocs(ordersQuery);

      const revenueByYear = {};

      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        const orderYear = order.createdAt.toDate().getFullYear();

        if (!revenueByYear[orderYear]) {
          revenueByYear[orderYear] = 0;
        }

        // Accumulate revenue for the year
        revenueByYear[orderYear] += order.orderTotal || 0;
      });

      // Convert the revenueByYear object into an array of objects for AG Grid
      const formattedData = Object.keys(revenueByYear).map((year) => ({
        year: parseInt(year, 10),
        totalRevenue: revenueByYear[year],
      }));

      setRowData(formattedData);
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
    }
  };

  useEffect(() => {
    if (shopId) {
      fetchYearlyRevenue();
    }
  }, [shopId]);

  const handleExport = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  const handleToggleCsvContent = () => {
    if (toggleShowCSV) {
      setCsvContent("");
      setToggleShowCSV(false);
    } else {
      const csvData = gridRef.current.api.getDataAsCsv();
      setCsvContent(csvData);
      setToggleShowCSV(true);
    }
  };

  useEffect(() => {
    if (toggleShowCSV) {
      const csvData = gridRef.current.api.getDataAsCsv();
      setCsvContent(csvData);
    }
  }, [rowData]);

  return (
    <section>
      <div className="flex flex-col items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium">Yearly Revenue</p>
          <p className="text-sm font-normal">
            Shows yearly revenue, providing a comprehensive summary of total
            revenue generated for each year. It includes columns for the Year
            and Total Revenue (₱), giving a clear view of financial performance
            over time. Filters enable quick searching and sorting by specific
            years. Additionally, there is an option to download the data as a
            CSV file for further analysis, reporting, or record-keeping
          </p>
        </div>
        <div className="flex items-center gap-4 ml-auto">
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
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          paginationPageSize={15}
          paginationPageSizeSelector={[15, 25, 50]}
          domLayout="normal"
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

export default YearlyRevenue;
