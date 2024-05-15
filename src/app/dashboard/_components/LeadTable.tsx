"use client";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";

const LeadTable = ({
  rows,
  columns,
}: {
  rows: GridRowsProp;
  columns: GridColDef[];
}) => {
  return (
    <div className="mx-20 bg-slate-700 text-white">
      <DataGrid
        sx={{
          borderColor: "primary.dark",
          backgroundColor: "black",
          color: "white",
          // make column header background black
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "black",
          },
          "& .MuiToolbar-root": {
            color: "white",
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: "black",
          },
        }}
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

export default LeadTable;
