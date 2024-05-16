"use client";
import * as React from "react";
import {
  type GridRowsProp,
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridEventListener,
  type GridRowId,
  type GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { MdCancel } from "react-icons/md";
import { FaEdit, FaSave } from "react-icons/fa";
import { DeleteForm } from "./DeleteForm";
import { toast } from "sonner";
import { updateLead } from "@/app/actions";
import { useEffect } from "react";

export default function FullFeaturedCrudGrid({
  rows: initialRows,
}: {
  rows: GridRowsProp;
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id)); // optimistic update
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
      valueFormatter: (value: string) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseFloat(value));
      },
    },
    {
      field: "estimatedCommission",
      headerName: "Estimated Commission",
      flex: 1,
      valueFormatter: (value: string) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseFloat(value));
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<FaSave size={16} />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<MdCancel size={24} className="text-red-500" />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<FaEdit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,

          <DeleteForm
            key={id}
            id={id as number}
            onClick={() => handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <div className="mx-6 bg-slate-700 text-white sm:mx-20">
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={async (updatedRow, originalRow) => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            await updateLead(originalRow, updatedRow);
            toast("Successfully updated row");
            return processRowUpdate(updatedRow as GridRowModel);
          } catch (error) {
            toast("Failed to update row");
          }
        }}
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
        pageSizeOptions={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
        ]}
      />
    </div>
  );
}
