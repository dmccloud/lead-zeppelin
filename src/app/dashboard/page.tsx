import { db } from "@/server/db";
import { AddForm } from "./_components/AddForm";

const DashboardPage: React.FC = async () => {
  const data = await db.query.leads.findMany();
  console.log(data);
  return (
    <div>
      <AddForm />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
