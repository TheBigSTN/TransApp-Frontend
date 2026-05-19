"use client";

import { ClientData } from "@/models/Client";
import { KeyedMutator } from "swr";
import { Form, FormFieldProps, InferFormData } from "./Form";
import { add_editHandler } from "../../_helper/helper copy";

interface ClientFormProps {
  defaultValues?: ClientData;
  currentValues: ClientData[];
  mutate: KeyedMutator<ClientData[]>;
  close?: () => void;
}

export default function ClientForm({ defaultValues, currentValues, mutate, close }: ClientFormProps) {
  const fields = [
    {
      label: "Nume",
      id: "nume",
      fieldType: "input",
      type: "text",
      placeholder: "John Doe",
      required: true,
      defaultValue: defaultValues?.nume,
    },
    {
      label: "CUI",
      id: "cui",
      fieldType: "input",
      type: "text",
      placeholder: "123456",
      required: true,
      defaultValue: defaultValues?.cui,
    },
    {
      label: "Adresă de facturare",
      id: "adresaFacturare",
      fieldType: "input",
      type: "text",
      placeholder: "123 Main St",
      defaultValue: defaultValues?.adresaFacturare,
    },
    {
      label: "Adresă de corespondență",
      id: "adresaCorespondenta",
      fieldType: "input",
      type: "text",
      placeholder: "456 Elm St",
      defaultValue: defaultValues?.adresaCorespondenta,
    },
    {
      label: "Cod fiscal",
      id: "cod",
      fieldType: "input",
      type: "text",
      placeholder: "J/11/11111",
      defaultValue: defaultValues?.cod,
    },
    {
      label: "Cont Bancar",
      id: "cont",
      fieldType: "input",
      type: "text",
      placeholder: "1234567890",
      defaultValue: defaultValues?.cont,
    },
    {
      label: "Bancă",
      id: "banca",
      fieldType: "input",
      type: "text",
      placeholder: "XYZ Bank",
      defaultValue: defaultValues?.banca,
    },
    {
      label: "Contact",
      id: "contact",
      fieldType: "input",
      type: "text",
      placeholder: "John Doe",
      defaultValue: defaultValues?.contact,
    },
    {
      label: "Email",
      id: "email",
      fieldType: "input",
      type: "email",
      placeholder: "example@example.com",
      defaultValue: defaultValues?.email,
    },
    {
      label: "Telefon",
      id: "telefon",
      fieldType: "input",
      type: "text",
      placeholder: "123-456-7890",
      required: true,
      defaultValue: defaultValues?.telefon,
    },
  ] as const satisfies FormFieldProps[];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: InferFormData<typeof fields>
  ) => {
    e.preventDefault();
    const payload: ClientData = {
      id: defaultValues?.id ?? 0,
      nume: data.nume,
      cui: data.cui,
      adresaFacturare: data.adresaFacturare,
      adresaCorespondenta: data.adresaCorespondenta,
      cod: data.cod,
      cont: data.cont,
      banca: data.banca,
      contact: data.contact,
      email: data.email,
      telefon: data.telefon,
    };
    try {
      if (payload.id === 0)
        await mutate(
          add_editHandler("client", currentValues, payload), {
          optimisticData: [payload, ...currentValues]
        });
      else
        await mutate(
          add_editHandler("client", currentValues, payload), {
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
