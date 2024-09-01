import React, { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const BasicTable = ({
  rowData,
  columnDefs,
  defaultColDef = { flex: 1, minWidth: 150, resizable: true, filter: true },
  height = 300,
  width = "100%",
  rowSelection = "single",
  theme = "ag-theme-quartz",
  title = "Table",
}) => {
  const gridRef = useRef();

  return (
    <div>
      <h2 className="px-10 py-3 text-lg font-semibold text-gray-900">{title}</h2>
      <div className={`${theme} px-6`} style={{ height, width }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};

export default BasicTable;
