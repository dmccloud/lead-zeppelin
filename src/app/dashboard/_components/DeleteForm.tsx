"use client";

import { deleteLead } from "@/app/actions";
import { Button } from "@/components/ui";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const initialState = {
  message: "",
};

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <FaTrash />
    </Button>
  );
};

export const DeleteForm = ({ id }: { id: number }) => {
  const [state, formAction] = useFormState(deleteLead, initialState);
  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state.message]);

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
