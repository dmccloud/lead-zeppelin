import { db } from "@/server/db";
import { AddForm } from "./_components/AddForm";
import LeadTable from "./_components/LeadTable";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Suspense } from "react";

const DashboardPage: React.FC = async () => {
  const data = await db.query.leads.findMany();

  const rows: GridRowsProp = data;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "estimatedSaleAmount",
      headerName: "Estimated Sale Amount",
      flex: 1,
    },
    {
      field: "estimatedCommission",
      headerName: "Estimated Commission",
      flex: 1,
    },
  ];
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AddForm />
        <LeadTable rows={rows} columns={columns} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
