import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getUserById } from "../../../firebase/user";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

const YearlyRevenue = ({ shopId }) => {
  const gridRef = useRef();
  const navigate = useNavigate();
  const orderGridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [selectedYearOrders, setSelectedYearOrders] = useState([]);
  const [isOrderTableVisible, setIsOrderTableVisible] = useState(false);
  const [csvContent, setCsvContent] = useState("");
  const [toggleShowCSV, setToggleShowCSV] = useState(false);
  const [toggleShowOrderCSV, setToggleShowOrderCSV] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);

  const columnDefs = useMemo(
    () => [
      { headerName: "Year", field: "year", flex: 1, sortable: true },
      {
        headerName: "Total Revenue (₱)",
        field: "totalRevenue",
        flex: 1,
        valueFormatter: (params) => formatToPeso(params.value),
      },
      {
        headerName: "Action",
        field: "action",
        filter: false,
        flex: 1,
        cellRenderer: (params) => (
          <button
            className="px-3 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
            onClick={() => fetchOrdersByYearAndStatus(params.data.year)}
          >
            <EyeIcon className="inline-block w-4 h-4 mr-1" />
            <span className="text-sm">View</span>
          </button>
        ),
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

  const orderColumnDefs = [
    { headerName: "Transaction ID", field: "id", flex: 1 },
    { headerName: "Name", field: "shopperName", flex: 1 },
    {
      headerName: "Quantity",
      field: "orderItems",
      flex: 1,
      valueFormatter: (params) => params.value.length,
    },
    {
      headerName: "Total Price (₱)",
      field: "orderTotal",
      flex: 1,
      valueFormatter: (params) => formatToPeso(params.value),
    },
    { headerName: "Status", field: "orderStatus", flex: 1 },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
      sort: "desc",
      sortIndex: 0,
      valueGetter: (params) => {
        const createdAtDate = params.data.createdAt;
        if (createdAtDate && createdAtDate.seconds) {
          return new Date(createdAtDate.seconds * 1000);
        }
        return null;
      },
      valueFormatter: (params) => {
        const date = params.value;
        if (date instanceof Date) {
          return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
      },
    },
    {
      headerName: "Action",
      field: "action",
      filter: false,
      flex: 1,
      cellRenderer: (params) => {
        return (
          <button
            className="px-3 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
            onClick={() => {
              navigate(`/seller-page/transaction/details/${params.data.id}`);
            }}
          >
            <EyeIcon className="inline-block w-4 h-4 mr-1" />
            <span className="text-sm">View</span>
          </button>
        );
      },
    },
  ];

  const fetchYearlyRevenue = async () => {
    try {
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

        revenueByYear[orderYear] += order.orderTotal || 0;
      });

      const formattedData = Object.keys(revenueByYear).map((year) => ({
        year: parseInt(year, 10),
        totalRevenue: revenueByYear[year],
      }));

      setRowData(formattedData);
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
    }
  };

  const fetchOrdersByYearAndStatus = async (year) => {
    try {
      const ordersRef = collection(db, "orders");
      const ordersQuery = query(
        ordersRef,
        where("shopId", "==", shopId),
        where("orderStatus", "in", ["Delivered", "Picked-up"])
      );
      const ordersSnapshot = await getDocs(ordersQuery);

      const orders = [];

      for (const doc of ordersSnapshot.docs) {
        const order = doc.data();
        const orderYear = order.createdAt.toDate().getFullYear();

        if (orderYear === year) {
          const shopperInfo = await getUserById(order.shopperId);

          orders.push({
            id: doc.id,
            ...order,
            shopperName: shopperInfo
              ? `${shopperInfo.firstName} ${shopperInfo.lastName}`
              : "N/A",
          });
        }
      }
      setSelectedYear(year);
      setSelectedYearOrders(orders);
      setIsOrderTableVisible(true);
    } catch (error) {
      console.error("Error fetching orders by year and status:", error);
    }
  };

  useEffect(() => {
    if (shopId) {
      fetchYearlyRevenue();
    }
  }, [shopId]);

  const handleExport = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  };

  const handleOrderExport = () => {
    if (orderGridRef.current) {
      orderGridRef.current.api.exportDataAsCsv();
    }
  };

  const handleToggleCsvContent = () => {
    if (toggleShowCSV) {
      setCsvContent("");
      setToggleShowCSV(false);
    } else if (gridRef.current) {
      const csvData = gridRef.current.api.getDataAsCsv();
      setCsvContent(csvData);
      setToggleShowCSV(true);
    }
  };

  const handleToggleOrderCsvContent = () => {
    if (toggleShowOrderCSV) {
      setCsvContent("");
      setToggleShowOrderCSV(false);
    } else if (orderGridRef.current) {
      const csvData = orderGridRef.current.api.getDataAsCsv();
      setCsvContent(csvData);
      setToggleShowOrderCSV(true);
    }
  };

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
            CSV file for further analysis, reporting, or record-keeping.
          </p>
        </div>
        <div className="flex items-center justify-between w-full gap-4 ml-auto ">
          <nav className="flex items-center gap-2 mb-3">
            {selectedYear !== 0 && (
              <>
                <div className="p-1 w-fit">
                  <ArrowLeftIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setSelectedYear(0);
                      setIsOrderTableVisible(false);
                    }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h6
                    className="font-normal cursor-pointer hover:text-arfagreen"
                    onClick={() => {
                      setSelectedYear(0);
                      setIsOrderTableVisible(false);
                    }}
                  >
                    Yearly
                  </h6>
                  <h6 className="cursor-pointer">/</h6>
                  <h6 className="font-normal cursor-pointer hover:text-arfagreen">
                    {selectedYear}
                  </h6>
                </div>
              </>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={
                !isOrderTableVisible
                  ? handleToggleCsvContent
                  : handleToggleOrderCsvContent
              }
              className="flex text-arfablack items-center border-gray-300 border justify-center gap-1 bg-arfagray font-medium rounded-md text-sm px-2 py-2.5 text-center"
            >
              {(!isOrderTableVisible && toggleShowCSV) ||
              (isOrderTableVisible && toggleShowOrderCSV) ? (
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
              onClick={() =>
                !isOrderTableVisible ? handleExport() : handleOrderExport()
              }
              className="text-white flex min-w-max items-center justify-center gap-1 bg-arfagreen font-medium rounded-md text-sm px-2 py-2.5 text-center"
            >
              <ArrowDownOnSquareStackIcon className="w-5 h-5 text-white" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>

      {isOrderTableVisible ? (
        <div className="ag-theme-quartz" style={{ height: "600px" }}>
          <AgGridReact
            ref={orderGridRef}
            rowData={selectedYearOrders}
            columnDefs={orderColumnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            paginationPageSize={15}
            paginationPageSizeSelector={[15, 25, 50]}
            domLayout="normal"
          />
          {toggleShowOrderCSV && (
            <div className="mt-4">
              <textarea
                value={csvContent}
                readOnly
                placeholder="CSV content will appear here when you click 'Show CSV Content'"
                className="h-40 bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              />
            </div>
          )}
        </div>
      ) : (
        <section>
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
        </section>
      )}
      <Toaster />
    </section>
  );
};

export default YearlyRevenue;
