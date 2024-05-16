import { db } from "@/server/db";
import { insertLeadsSchema, leads } from "@/server/db/schema";
import { type InferInsertModel, desc, eq } from "drizzle-orm";
import { commissionCalc } from "@/lib/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  if (searchParams.get("getAll")) {
    const results = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt), desc(leads.updatedAt));
    return Response.json(results);
  }

  if (searchParams.get("getByLeadId")) {
    const id = searchParams.get("getByLeadId");
    if (!id) {
      return Response.error();
    }
    const result = await db
      .select()
      .from(leads)
      .where(eq(leads.id, parseInt(id)))
      .orderBy(desc(leads.createdAt), desc(leads.updatedAt));
    return Response.json(result);
  }

  if (searchParams.get("getByOwnerId")) {
    const ownerId = searchParams.get("getByOwnerId");
    if (!ownerId) {
      return Response.error();
    }
    const result = await db
      .select()
      .from(leads)
      .where(eq(leads.ownerId, ownerId))
      .orderBy(desc(leads.createdAt), desc(leads.updatedAt));
    return Response.json(result);
  }
}

export async function POST(req: Request) {
  const data: InferInsertModel<typeof leads> = await req.json();
  if (data.status?.toLowerCase() === "unqualified") {
    data.estimatedCommission = "0.0";
  } else {
    data.estimatedCommission = commissionCalc(
      parseFloat(data.estimatedSaleAmount!),
    )
      .toPrecision(2)
      .toString();
  }

  const schema = insertLeadsSchema;
  if (schema.safeParse(data).error) {
    return Response.json({ message: "Invalid data", status: 400 });
  }

  const result = await db
    .insert(leads)
    .values({
      ...data,
    })
    .returning();
  return Response.json(result);
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.error();
  }
  const data: InferInsertModel<typeof leads> = await req.json();

  if (data.status?.toLowerCase() === "unqualified") {
    data.estimatedCommission = "0.0";
  } else {
    data.estimatedCommission = commissionCalc(
      parseFloat(data.estimatedSaleAmount!),
    )
      .toPrecision(2)
      .toString();
  }

  const schema = insertLeadsSchema;
  if (schema.safeParse(data).error) {
    return Response.json({ message: "Invalid data", status: 400 });
  }

  const result = await db
    .update(leads)
    .set(data)
    .where(eq(leads.id, parseInt(id)))
    .returning();
  return Response.json(result);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.error();
  }
  const result = await db
    .delete(leads)
    .where(eq(leads.id, parseInt(id)))
    .returning();
  return Response.json(result);
}
