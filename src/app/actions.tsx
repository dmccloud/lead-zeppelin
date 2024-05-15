"use server";

import { db } from "@/server/db";
import { leads } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// eslint-disable-next-line
export async function createLead(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
  });
  const data = schema.parse(Object.fromEntries(formData));

  try {
    await db.insert(leads).values(data);
    revalidatePath("/dashboard");
    return { message: "Successfully added lead" };
  } catch (error) {
    return { message: "Failed to update table" };
  }
}
