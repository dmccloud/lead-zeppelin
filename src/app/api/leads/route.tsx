/* eslint-disable */
import { db } from "@/server/db";
import { leads } from "@/server/db/schema";
import type { NextApiRequest, NextApiResponse } from "next";
import { InferInsertModel, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url!);
  const searchParams = new URLSearchParams(url.searchParams);

  if (searchParams.get("getAll")) {
    const results = await db.query.leads.findMany();
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
      .where(eq(leads.id, parseInt(id)));
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
      .where(eq(leads.ownerId, ownerId));
    return Response.json(result);
  }
}

export async function POST(req: Request) {
  const data: InferInsertModel<typeof leads> = await req.json();
  const result = await db.insert(leads).values({
    ...data,
  });
  return Response.json(result);
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url!);
  const id = searchParams.get("id");
  if (!id) {
    return Response.error();
  }
  const data: InferInsertModel<typeof leads> = await req.json();
  const result = await db
    .update(leads)
    .set(data)
    .where(eq(leads.id, parseInt(id)));
  return Response.json(result);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url!);
  const id = searchParams.get("id");
  if (!id) {
    return Response.error();
  }
  const result = await db.delete(leads).where(eq(leads.id, parseInt(id)));
  return Response.json(result);
}
