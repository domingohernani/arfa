import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerProducts = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {
      product: "The Avalon Altar",
      category: "Storage",
      description: "A sleek, modern cabinet with ample storage.",
      inventory: "6 in stock",
      price: "₱ 4,490.00",
      rating: "5.0 (32 Votes)",
      createdAt: "2024-07-12",
      status: "On Sale",
    },
    {
      product: "The Windsor Whisper",
      category: "Living Room",
      description: "Comfortable chair perfect for any living room.",
      inventory: "6 in stock",
      price: "₱ 2,499.00",
      rating: "4.8 (24 Votes)",
      createdAt: "2024-06-18",
      status: "Not On Sale",
    },
    {
      product: "The Valencia Vista",
      category: "Dining Room",
      description: "Elegant dining table for modern spaces.",
      inventory: "8 in stock",
      price: "₱ 1,290.00",
      rating: "5.0 (54 Votes)",
      createdAt: "2024-07-01",
      status: "On Sale",
    },
    {
      product: "The Cambridge Cache",
      category: "Bedroom",
      description: "Stylish cabinet for bedroom storage.",
      inventory: "2 in stock",
      price: "₱ 3,490.00",
      rating: "4.5 (31 Votes)",
      createdAt: "2024-07-08",
      status: "Not On Sale",
    },
    {
      product: "The Avalon Accent",
      category: "Office",
      description: "Ergonomic office chair with a modern design.",
      inventory: "12 in stock",
      price: "₱ 1,990.00",
      rating: "4.9 (22 Votes)",
      createdAt: "2024-07-10",
      status: "On Sale",
    },
    {
      product: "The Seraphina Surface",
      category: "Accent",
      description: "A beautiful accent table to elevate your space.",
      inventory: "9 in stock",
      price: "₱ 1,890.00",
      rating: "5.0 (32 Votes)",
      createdAt: "2024-06-22",
      status: "Not On Sale",
    },
    {
      product: "The Meridian Marvel",
      category: "Entryway",
      description: "Modern storage cabinet for your entryway.",
      inventory: "5 in stock",
      price: "₱ 4,990.00",
      rating: "4.8 (24 Votes)",
      createdAt: "2024-07-15",
      status: "On Sale",
    },
    {
      product: "The Berkshire Breeze",
      category: "Outdoor",
      description: "Stylish outdoor chair for your garden.",
      inventory: "Out of Stock",
      price: "₱ 1,490.00",
      rating: "5.0 (54 Votes)",
      createdAt: "2024-07-03",
      status: "Not On Sale",
    },
  ]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product",
        field: "product",
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
        headerName: "Description",
        field: "description",
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Inventory",
        field: "inventory",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Price",
        field: "price",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Rating",
        field: "rating",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Created At",
        field: "createdAt",
        flex: 1,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Status",
        field: "status",
        flex: 1,
        filter: "agTextColumnFilter",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: "agTextColumnFilter", // Default filter
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
        quickFilterText="" // For global search
      />
    </div>
  );
};

export default SellerProducts;
