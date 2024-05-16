/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { deleteLead, updateLead } from "@/app/actions";
import {
  DataGrid,
  GridActionsCellItem,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridColDef,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";

const LeadTable = ({ rows }: { rows: GridRowsProp }) => {
  const handleDeleteClick = (id: number) => async () => {
    await deleteLead(id);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
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
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: undefined,
      getActions: ({ id }) => [
        <GridActionsCellItem
          key="som"
          icon={<FaTrash />}
          label="Delete"
          onClick={handleDeleteClick(id as number)}
          color="inherit"
        />,
      ],
    },
  ];
  return (
    <div className="mx-20 bg-slate-700 text-white">
      <DataGrid
        processRowUpdate={async (updatedRow, originalRow) => {
          console.log(updatedRow);
          await updateLead(originalRow, updatedRow);
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
      />
    </div>
  );
};

export default LeadTable;
