/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/server/db";
import { leads } from "@/server/db/schema";
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
  console.log(formData);

  const data = formData;

  try {
    await db
      .update(leads)
      .set(data)
      .where(and(eq(leads.id, data.id!), eq(leads.ownerId, userId)));
    revalidatePath("/dashboard");
    return { message: "Successfully updated lead" };
  } catch (error) {
    return { message: "Failed to update table" };
  }
}

export async function deleteLead(id: number) {
  const { userId } = auth();
  if (!userId) {
    return { message: "No user ID found" };
  }

  const data = id;
  console.log(data);

  try {
    await db
      .delete(leads)
      .where(and(eq(leads.id, data), eq(leads.ownerId, userId)));
    revalidatePath("/dashboard");
    return { message: "Successfully deleted lead" };
  } catch (error) {
    return { message: "Failed to delete lead" };
  }
}
