"use client";

import { MasinaData } from "@/models/Masina";
import { KeyedMutator } from "swr";
import { Form, FormFieldProps, InferFormData } from "./Form";
import { useRouter } from "next/navigation";
import { add_editHandler } from "app/_helper/helper copy";

interface MasinaForm {
  defaultValues?: MasinaData;
  currentValues: MasinaData[]
  mutate: KeyedMutator<MasinaData[]>
  close?: () => void;
}

export default function MasinaForm({ currentValues, defaultValues, close, mutate }: MasinaForm) {
  const fields = [
    {
      label: "Număr",
      id: "numar",
      fieldType: "input",
      type: "text",
      placeholder: "IF-50-SCM",
      required: true,
      defaultValue: defaultValues?.numar,
    },
    {
      label: "Serie",
      id: "serie",
      fieldType: "input",
      type: "text",
      placeholder: "WDIfd78fdD09FDfsf78",
      required: true,
      defaultValue: defaultValues?.serie,
      maxLength: 17,
      minLength: 17,
    },
    {
      label: "Capacitate Transport",
      id: "capacitateTransport",
      fieldType: "input",
      type: "number",
      required: true,
      defaultValue: defaultValues?.capacitateTransport,
      min: 0,
    },
    {
      label: "Capacitate Combustibil",
      id: "capacitateCombustibil",
      fieldType: "input",
      type: "number",
      required: true,
      defaultValue: defaultValues?.capacitateCombustibil,
      min: 0,
    },
    {
      label: "Tip Auto",
      id: "tipauto",
      fieldType: "dropdown",
      options: ["CAPTRACTOR", "REMORCA", "AUTOVEHICUL", "DUBITA"],
      required: true,
      defaultValue: defaultValues?.tipauto,
    },
    {
      label: "Status",
      id: "status",
      fieldType: "dropdown",
      options: ["ACTIVA", "INACTIVA"],
      required: true,
      defaultValue: defaultValues?.status,
    },
    { label: "submit", id: "submit", fieldType: "submit" },
  ] as const satisfies FormFieldProps[];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: InferFormData<typeof fields>
  ) => {
    e.preventDefault();
    const payload: MasinaData = {
      id: defaultValues?.id ?? 0,
      numar: data.numar,
      serie: data.serie,
      capacitateTransport: Number(data.capacitateTransport),
      capacitateCombustibil: Number(data.capacitateCombustibil),
      tipauto: data.tipauto,
      status: data.status,
    };
    try {
      if (payload.id === 0)
        await mutate(
          add_editHandler("masina", currentValues, payload), {
          optimisticData: [payload, ...currentValues]
        })
      else
        await mutate(
          add_editHandler("masina", currentValues, payload), {
          optimisticData: currentValues.map(obj =>
            obj.id === payload.id ? { ...obj, ...payload } : obj
          )
        })
      if (close) close();
    } catch (error: any) {
      console.log(error.message)
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
