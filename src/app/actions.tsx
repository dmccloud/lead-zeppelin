"use server";

import { db } from "@/server/db";
import { leads } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
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
