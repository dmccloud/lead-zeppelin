"use server";

import { commissionCalc } from "@/lib/utils";
import { db } from "@/server/db";
import { insertLeadsSchema, leads } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { type InferInsertModel, and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// eslint-disable-next-line
export async function createLead(prevState: any, formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    return { message: "No user ID found" };
  }
  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const inputData = formSchema.parse(Object.fromEntries(formData));
  const data = {
    ...inputData,
    ownerId: userId,
    status: "New",
    estimatedSaleAmount: "0.0",
    estimatedCommission: "0.0",
  };

  if (formSchema.safeParse(data).success === false) {
    return { message: "Invalid data" };
  }

  try {
    await db.insert(leads).values(data);
    revalidatePath("/dashboard");
    return { message: "Successfully added lead" };
  } catch (error) {
    return { message: "Failed to update table" };
  }
}

export async function updateLead(
  prevState: any,
  formData: InferInsertModel<typeof leads>,
) {
  const { userId } = auth();
  if (!userId) {
    return { message: "No user ID found" };
  }
  const data = formData;
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
    throw new Error("Invalid data");
  }

  try {
    await db
      .update(leads)
      .set(data)
      .where(and(eq(leads.id, data.id!), eq(leads.ownerId, userId)));
    revalidatePath("/dashboard");

    return { message: "Successfully updated lead" };
  } catch (error: any | unknown) {
    return { message: error.message ?? "Failed to update table" };
  }
}

export async function deleteLead(prevState: any, formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    return { message: "No user ID found" };
  }
  const formSchema = z.object({
    id: z.string(),
  });
  const data = formSchema.parse(Object.fromEntries(formData));

  try {
    await db
      .delete(leads)
      .where(and(eq(leads.id, parseInt(data.id)), eq(leads.ownerId, userId)));
    revalidatePath("/dashboard");
    return { message: "Successfully deleted lead" };
  } catch (error) {
    return { message: "Failed to delete lead" };
  }
}
