import React, { useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const ReviewsTable = ({ reviews }) => {
  const columnDefs = useMemo(
    () => [
      { headerName: "ID", field: "id", flex: 1 },
      { headerName: "Title", field: "title", flex: 2 },
      {
        headerName: "Description",
        field: "description",
        flex: 2,
      },
      { headerName: "Rating", field: "rating", flex: 1 },
      {
        headerName: "Reviewer Name",
        field: "userData.firstName",
        flex: 2,
      },
      {
        headerName: "Date",
        field: "date",
        flex: 1,
        sort: "desc",
        sortIndex: 0,
        valueFormatter: (params) => {
          const seconds = params.value?.seconds || 0;
          const date = new Date(seconds * 1000);
          return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        },
      },
    ],
    []
  );

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={reviews}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
};

export default ReviewsTable;
