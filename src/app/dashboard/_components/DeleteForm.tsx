"use client";

import { deleteLead } from "@/app/actions";
import { Button } from "@/components/ui";
import type { leads } from "@/server/db/schema";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Submit
    </Button>
  );
};

export const DeleteForm = ({
  id,
  lead,
}: {
  id: number;
  lead: typeof leads;
}) => {
  const [state, formAction] = useFormState(deleteLead, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
};
