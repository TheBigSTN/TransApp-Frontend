'use client'
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientData } from "@/models/Client";
import { KeyedMutator } from "swr";
import { CellComponent } from "@/lib/columns";
import ClientForm from "@/forms/ClientForm";

export const columns = (mutate: KeyedMutator<ClientData[]>, currentValues: ClientData[]): ColumnDef<ClientData>[] => [
  {
    id: "select",
    header: function SelectHeader({ table }) {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      );
    },
    cell: function SelectCell({ row }) {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nume",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nume
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("nume")}</div>,
  },
  {
    accessorKey: "cui",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CUI
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("cui")}</div>,
  },
  {
    accessorKey: "adresaFacturare",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Adresă Facturare
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("adresaFacturare")}</div>,
  },
  {
    accessorKey: "adresaCorespondenta",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Adresă Corespondență
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("adresaCorespondenta")}</div>,
  },
  {
    accessorKey: "cod",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cod fiscal
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("cod")}</div>,
  },
  {
    accessorKey: "cont",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cont
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("cont")}</div>,
  },
  {
    accessorKey: "banca",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bancă
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("banca")}</div>,
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("contact")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "telefon",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefon
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("telefon")}</div>,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <CellComponent
        model="client"
        row={row}
        Form={ClientForm}
        mutate={mutate}
        currentValues={currentValues}
      />
    },
  },
];

