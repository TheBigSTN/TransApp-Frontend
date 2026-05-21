"use client";

import { LicentaData } from "@/models/Licenta";
import { KeyedMutator } from "swr";
import { Form, FormFieldProps, InferFormData } from "./Form";
import { add_editHandler } from "../../_helper/helper copy";

interface LicentaFormProps {
  defaultValues?: LicentaData;
  currentValues: LicentaData[];
  mutate: KeyedMutator<LicentaData[]>;
  close?: () => void;
}

export default function LicentaForm({ defaultValues, currentValues, mutate, close }: LicentaFormProps) {
  const fields = [
    {
      label: "Număr Mașina",
      id: "masinaNumar",
      fieldType: "input",
      type: "text",
      placeholder: "B 123 ABC",
      required: true,
      defaultValue: defaultValues?.masinaNumar,
    },
    {
      label: "Dată Început",
      id: "data_inceput",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.data_inceput,
    },
    {
      label: "Dată Final",
      id: "data_final",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.data_final,
    },
    {
      label: "Tip",
      id: "tip",
      fieldType: "dropdown",
      type: "text",
      options: ["ROVINIETA", "LICENTATRANSPORT", "RCA", "ITP", "CASCO"],
      required: true,
      defaultValue: defaultValues?.tip,
    },
  ] as const satisfies FormFieldProps[];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: InferFormData<typeof fields>
  ) => {
    e.preventDefault();
    const payload: LicentaData = {
      id: defaultValues?.id ?? 0,
      masinaId: defaultValues?.masinaId ?? 0,
      masinaNumar: data.masinaNumar,
      data_inceput: data.data_inceput,
      data_final: data.data_final,
      tip: data.tip,
    };
    try {
      if (payload.id === 0)
        await mutate(
          add_editHandler("licenta", currentValues, payload), {
          optimisticData: [payload, ...currentValues]
        });
      else
        await mutate(
          add_editHandler("licenta", currentValues, payload), {
          optimisticData: currentValues.map(obj =>
            obj.id === payload.id ? { ...obj, ...payload } : obj
          )
        });
      if (close) close();
    } catch (error: any) {
      if (error.message === 'Auth_Redirect') {
        window.location.reload();
      } else {
        throw error;
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <Form fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}
