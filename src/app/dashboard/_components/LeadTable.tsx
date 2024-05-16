/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { updateLead } from "@/app/actions";
import {
  DataGrid,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridColDef,
  type GridRowsProp,
  type GridCellEditStopParams,
  GridCellEditStopReasons,
  type MuiEvent,
} from "@mui/x-data-grid";

import { DeleteForm } from "./DeleteForm";
import { toast } from "sonner";

const LeadTable = ({ rows }: { rows: GridRowsProp }) => {
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, editable: true },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["New", "Active", "Unqualified", "Working", "Follow-Up"],
    },
    {
      field: "estimatedSaleAmount",
      headerName: "Estimated Sale Amount",
      flex: 1,
      editable: true,
    },
    {
      field: "estimatedCommission",
      headerName: "Estimated Commission",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: undefined,
      getActions: ({ id }) => [<DeleteForm key={id} id={id as number} />],
    },
  ];
  return (
    <div className="mx-20 bg-slate-700 text-white">
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        processRowUpdate={async (updatedRow, originalRow) => {
          try {
            await updateLead(originalRow, updatedRow);
            toast("Successfully updated row");
          } catch (error: unknown | any) {
            toast(error ? error.message : "Failed to update row");
            console.error(error);
          }
        }}
        onRowEditStop={handleRowEditStop}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
        editMode="row"
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
        pageSizeOptions={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
        ]}
        onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
          if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
      />
    </div>
  );
};

export default LeadTable;
