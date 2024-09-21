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
      {
        headerName: "Rating",
        field: "rating",
        flex: 1,
        valueGetter: (params) => {
          const rating = params.data.rating;
          return `${rating} star(s)`;
        },
      },
      {
        headerName: "Reviewer Name",
        field: "userData.firstName",
        flex: 2,
        valueGetter: (params) => {
          const firstName = params.data.userData?.firstName || "";
          const lastName = params.data.userData?.lastName || "";
          return `${firstName} ${lastName}`.trim();
        },
      },
      {
        headerName: "Date",
        field: "date",
        filter: "agDateColumnFilter",
        flex: 1,
        sort: "desc",
        sortIndex: 0,
        valueGetter: (params) => {
          const dateValue = params.data.date;
          if (dateValue && dateValue.seconds) {
            return new Date(dateValue.seconds * 1000);
          }
          return null;
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
