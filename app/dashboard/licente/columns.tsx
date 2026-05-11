"use client"

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LicentaData } from "@/models/Licenta";
import { CellComponent } from "@/lib/columns";
import LicentaForm from "@/forms/LicentaForm";
import { KeyedMutator } from "swr";

export const columns = (mutate: KeyedMutator<LicentaData[]>, currentValues: LicentaData[]): ColumnDef<LicentaData>[] => [
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
    accessorKey: "masinaNumar",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Masina Numar
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("masinaNumar")}</div>,
  },
  {
    accessorKey: "data_inceput",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Inceput
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("data_inceput")}</div>,
  },
  {
    accessorKey: "data_final",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dată Final
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("data_final")}</div>,
  },
  {
    accessorKey: "tip",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tip
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("tip")}</div>,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <CellComponent
        model="licenta"
        row={row}
        Form={LicentaForm}
        mutate={mutate}
        currentValues={currentValues}
      />
    },
  },
];
