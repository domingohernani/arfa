import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from "../../components/CustomButton";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerTransaction = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {
      transactionNumber: "TXN1234567890",
      name: "Jalen Villaflor",
      location: "Binalonan, Pangasinan",
      orders: 5,
      spent: "₱ 5628.80",
    },
    {
      transactionNumber: "TXN0987654321",
      name: "Jeffrey Saguico",
      location: "San Manuel, Pangasinan",
      orders: 12,
      spent: "₱ 25946.75",
    },
    {
      transactionNumber: "TXN1122334455",
      name: "Cristine Basada",
      location: "Laoac, Pangasinan",
      orders: 6,
      spent: "₱ 19650.12",
    },
    {
      transactionNumber: "TXN5566778899",
      name: "Lexi Estandian",
      location: "Bani, Pangasinan",
      orders: 3,
      spent: "₱ 10058.35",
    },
    {
      transactionNumber: "TXN1029384756",
      name: "Hanz Decano",
      location: "Urdaneta, Pangasinan",
      orders: 15,
      spent: "₱ 32654.03",
    },
    {
      transactionNumber: "TXN5647382910",
      name: "Arvin Regata",
      location: "Umingan, Pangasinan",
      orders: 12,
      spent: "₱ 45651.79",
    },
    {
      transactionNumber: "TXN1928374655",
      name: "Joshua Abundiente",
      location: "Binalonan, Pangasinan",
      orders: 5,
      spent: "₱ 16235.56",
    },
    {
      transactionNumber: "TXN8172635409",
      name: "Charles Inso",
      location: "Mangaldan, Pangasinan",
      orders: 7,
      spent: "₱ 36589.25",
    },
  ]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Transaction Number",
        field: "transactionNumber",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Name",
        field: "name",
        flex: 1,
        filter: "agTextColumnFilter",
        cellRendererFramework: (params) => (
          <div className="flex items-center">
            <div className="rounded-full bg-gray-300 text-center text-white w-8 h-8 flex items-center justify-center mr-3">
              {params.value.charAt(0)}
            </div>
            {params.value}
          </div>
        ),
      },
      {
        headerName: "Location",
        field: "location",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Orders",
        field: "orders",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Spent",
        field: "spent",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Action",
        field: "action",
        cellRenderer: CustomButton,
        filter: false,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true, // Default filter
      floatingFilter: true, // Enable floating filter for each column
      resizable: true,
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz p-5"
      style={{ height: "90%", width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        domLayout="normal"
        quickFilterText=""
      />
    </div>
  );
};

export default SellerTransaction;
