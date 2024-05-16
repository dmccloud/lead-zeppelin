"use client";

import { createLead } from "@/app/actions";
import { Button, Input } from "@/components/ui";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const initialState = {
  message: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Submit
    </Button>
  );
};

export function AddForm() {
  const [state, formAction] = useFormState(createLead, initialState);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);

  return (
    <div className="flex w-full justify-center">
      <form className="flex flex-row flex-wrap gap-2" action={formAction}>
        <h1 className="text-2xl font-bold">Add Lead</h1>
        <Input
          className="dark"
          type="text"
          id="name"
          name="name"
          required
          placeholder="Name"
        />
        <Input
          className="dark"
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
