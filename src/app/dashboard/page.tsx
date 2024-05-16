import { db } from "@/server/db";
import { AddForm } from "./_components/AddForm";
import LeadTable from "./_components/LeadTable";
import { type GridRowsProp } from "@mui/x-data-grid";
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

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AddForm />
        <LeadTable rows={rows} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
