"use client";

import { SoferData } from "@/models/Sofer";
import { KeyedMutator } from "swr";
import { Form, FormFieldProps, InferFormData } from "./Form";
import { add_editHandler } from "app/_helper/helper copy";

interface SoferForm {
  currentValues: SoferData[]
  defaultValues?: SoferData;
  close?: () => void;
  mutate: KeyedMutator<SoferData[]>
}

export default function SoferForm({ currentValues, defaultValues, close, mutate }: SoferForm) {
  const fields = [
    {
      label: "Nume",
      id: "nume",
      fieldType: "input",
      type: "text",
      placeholder: "Nume",
      required: true,
      defaultValue: defaultValues?.nume,
    },
    {
      label: "Prenume",
      id: "prenume",
      fieldType: "input",
      type: "text",
      placeholder: "Prenume",
      required: true,
      defaultValue: defaultValues?.prenume,
    },
    {
      label: "Data de Nastere",
      id: "datanastere",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.dataNastere,
    },
    {
      label: "Cnp",
      id: "cnp",
      fieldType: "input",
      type: "text",
      maxLength: 13,
      minLength: 13,
      placeholder: "CNP",
      required: true,
      defaultValue: defaultValues?.cnp,
    },
    {
      label: "Data de emitere permis",
      id: "emiterepermis",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.dataEmiterePermis,
    },
    {
      label: "Data de expirare permis",
      id: "expirarepermis",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.dataExpirarePermis,
    },
    {
      label: "Serie Permis",
      id: "seriepermis",
      fieldType: "input",
      type: "text",
      placeholder: "Serie Permis",
      required: true,
      defaultValue: defaultValues?.seriePermis,
    },
    {
      label: "Adresa",
      id: "adresa",
      fieldType: "input",
      type: "text",
      placeholder: "Adresa de domiciliu",
      required: true,
      defaultValue: defaultValues?.adresa,
    },
    {
      label: "Numar de telefon",
      id: "telefon",
      fieldType: "input",
      type: "text",
      placeholder: "0711222333",
      required: true,
      defaultValue: defaultValues?.telefon,
    },
    {
      label: "Email",
      id: "email",
      fieldType: "input",
      type: "email",
      placeholder: "example@example.com",
      required: true,
      defaultValue: defaultValues?.email,
    },
  ] as const satisfies FormFieldProps[];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: InferFormData<typeof fields>
  ) => {
    e.preventDefault();
    const payload: SoferData = {
      id: defaultValues?.id ?? 0,
      nume: data.nume,
      prenume: data.prenume,
      dataNastere: data.datanastere,
      cnp: data.cnp,
      seriePermis: data.seriepermis,
      dataEmiterePermis: data.emiterepermis,
      dataExpirarePermis: data.expirarepermis,
      adresa: data.adresa,
      telefon: data.telefon,
      email: data.email,
    };
    try {
      if (payload.id === 0)
        await mutate(
          add_editHandler("sofer", currentValues, payload), {
          optimisticData: [payload, ...currentValues]
        })
      else
        await mutate(
          add_editHandler("sofer", currentValues, payload), {
          optimisticData: currentValues.map(obj =>
            obj.id === payload.id ? { ...obj, ...payload } : obj
          )
        })
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
