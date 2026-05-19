"use client";

import { AlimentareData } from "@/models/Alimentare";
import { KeyedMutator } from "swr";
import { Form, FormFieldProps, InferFormData } from "./Form";
import { useRouter } from "next/navigation";
import { add_editHandler } from "../../_helper/helper copy";
// import { add_editHandler } from "app/_helper/helper copy";

interface AlimentareFormProps {
  defaultValues?: AlimentareData;
  currentValues: AlimentareData[];
  mutate: KeyedMutator<AlimentareData[]>;
  close?: () => void;
}

export default function AlimentareForm({ defaultValues, currentValues, mutate, close }: AlimentareFormProps) {
  const router = useRouter();

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
      label: "Dată Alimentare",
      id: "dataAlimentare",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.dataAlimentare,
    },
    {
      label: "Litri",
      id: "litri",
      fieldType: "input",
      type: "number",
      placeholder: "50",
      required: true,
      defaultValue: defaultValues?.litri,
    },
    {
      label: "Preț Unitar",
      id: "pretUnitar",
      fieldType: "input",
      type: "number",
      placeholder: "5.5",
      required: true,
      defaultValue: defaultValues?.pretUnitar,
    },
    {
      label: "Tip",
      id: "tip",
      fieldType: "input",
      type: "text",
      placeholder: "MOTORINA",
      required: true,
      defaultValue: defaultValues?.tip,
    },
  ] as const satisfies FormFieldProps[];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: InferFormData<typeof fields>
  ) => {
    e.preventDefault();
    const payload: AlimentareData = {
      id: defaultValues?.id ?? 0,
      masinaId: defaultValues?.masinaId ?? 0,
      masinaNumar: data.masinaNumar,
      dataAlimentare: data.dataAlimentare,
      litri: Number(data.litri),
      pretUnitar: Number(data.pretUnitar),
      tip: data.tip,
    };
    try {
      if (payload.id === 0)
        await mutate(
          add_editHandler("alimentare", currentValues, payload), {
          optimisticData: [payload, ...currentValues]
        });
      else
        await mutate(
          add_editHandler("alimentare", currentValues, payload), {
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
