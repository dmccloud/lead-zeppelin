import { db } from "@/server/db";
import { AddForm } from "./_components/AddForm";
import LeadTable from "./_components/LeadTable";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { leads } from "@/server/db/schema";

const DashboardPage: React.FC = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("No user ID found");
  }
  const data = await db.select().from(leads).where(eq(leads.ownerId, userId));

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
