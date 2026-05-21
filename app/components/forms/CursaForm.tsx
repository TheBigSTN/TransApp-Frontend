"use client";

import { CursaData } from "@/models/Cursa";
import { KeyedMutator } from "swr";
import { Form, FormFieldProps, InferFormData } from "./Form";
import { add_editHandler } from "../../_helper/helper copy";

interface CursaFormProps {
  defaultValues?: CursaData;
  currentValues: CursaData[];
  mutate: KeyedMutator<CursaData[]>;
  close?: () => void;
}

export default function CursaForm({ defaultValues, currentValues, mutate, close }: CursaFormProps) {
  const fields = [
    {
      label: "Kilometri",
      id: "km",
      fieldType: "input",
      type: "number",
      placeholder: "100",
      required: true,
      defaultValue: defaultValues?.km,
    },
    {
      label: "Dată Livrare",
      id: "dataEfectuare",
      fieldType: "input",
      type: "date",
      required: true,
      defaultValue: defaultValues?.dataEfectuare,
    },
    {
      label: "Adresă Livrare",
      id: "livrare",
      fieldType: "input",
      type: "text",
      placeholder: "Str. Exemplu, nr. 1",
      required: true,
      defaultValue: defaultValues?.livrare,
    },
    {
      label: "Numar Masina",
      id: "masinaNumar",
      fieldType: "input",
      type: "text",
      placeholder: "B 123 ABC",
      required: true,
      defaultValue: defaultValues?.masinaNumar,
    },
    {
      label: "CUI Client",
      id: "cuiClient",
      fieldType: "input",
      type: "text",
      placeholder: "RO12345678",
      required: true,
    },
    {
      label: "CNP Sofer",
      id: "cnpSofer",
      fieldType: "input",
      type: "text",
      placeholder: "1234567890123",
      required: true,
    },
    {
      label: "Tarif",
      id: "tarif",
      fieldType: "input",
      type: "number",
      placeholder: "100",
      required: true,
      defaultValue: defaultValues?.tarif,
    },
  ] as const satisfies FormFieldProps[];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: InferFormData<typeof fields>
  ) => {
    e.preventDefault();
    const payload: CursaData = {
      id: defaultValues?.id ?? 0,
      km: Number(data.km),
      dataEfectuare: data.dataEfectuare,
      idMasina: defaultValues?.idMasina ?? 0,
      idSofer: defaultValues?.idSofer ?? 0,
      idClient: defaultValues?.idClient ?? 0,
      idAnexa: null,
      livrare: data.livrare,
      tarif: Number(data.tarif),
      masinaNumar: defaultValues?.masinaNumar ?? data.masinaNumar,
      numeSofer: defaultValues?.numeSofer ?? data.cnpSofer,
      numeClient: defaultValues?.numeClient ?? data.cuiClient,
    };
    try {
      if (payload.id === 0)
        await mutate(
          add_editHandler("cursa", currentValues, payload), {
          optimisticData: [payload, ...currentValues]
        });
      else
        await mutate(
          add_editHandler("cursa", currentValues, payload), {
          optimisticData: currentValues.map(obj =>
            obj.id === payload.id ? { ...obj, ...payload } : obj
          )
        });
      if (close) close();
    } catch (error: any) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        cause: error.cause,
        stack: error.stack
      });
      if (error.message === 'Auth_Redirect') {
        window.location.reload();
      } else {
        // throw error;
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <Form fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}
