"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FormInputs = { name: string };
export const UPDATE_FORM_NAME = "update-project-form";
type UpdateProjectFormProps = {
  submitCb: (values: FormInputs) => Promise<void>;
  defaultValues: FormInputs;
};
function UpdateProjectForm({
  submitCb,
  defaultValues,
}: UpdateProjectFormProps) {
  const [form, setForm] = React.useState<FormInputs>(defaultValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitCb(form);
  };
  return (
    <form onSubmit={onSubmit} id={UPDATE_FORM_NAME}>
      <div className="space-y-2">
        <Label htmlFor="update-project-name">Project name</Label>
        <Input
          id="update-project-name"
          placeholder="project name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export { UpdateProjectForm };
