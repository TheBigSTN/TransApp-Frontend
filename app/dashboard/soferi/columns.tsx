"use client"
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SoferData } from "@/models/Sofer";
import SoferForm from "@/forms/SoferForm";
import { CellComponent } from "@/lib/columns";
import { KeyedMutator } from "swr";

export const columns = (mutate: KeyedMutator<SoferData[]>, currentValues: SoferData[]): ColumnDef<SoferData>[] => [
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
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("nume")}</div>,
  },
  {
    accessorKey: "prenume",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prenume
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("prenume")}</div>,
  },
  {
    accessorKey: "dataNastere",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dată Naștere
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataNastere")}</div>,
  },
  {
    accessorKey: "cnp",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNP
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("cnp")}</div>,
  },
  {
    accessorKey: "seriePermis",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serie Permis
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("seriePermis")}</div>,
  },
  {
    accessorKey: "dataEmiterePermis",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dată Emitere Permis
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataEmiterePermis")}</div>,
  },
  {
    accessorKey: "dataExpirarePermis",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dată Expirare Permis
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataExpirarePermis")}</div>,
  },
  {
    accessorKey: "adresa",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Adresă
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("adresa")}</div>,
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
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("telefon")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="text-center"> {/* Centering header content */}
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <CellComponent
        model="sofer"
        row={row}
        Form={SoferForm}
        mutate={mutate}
        currentValues={currentValues}
      />
    },
  },
];
