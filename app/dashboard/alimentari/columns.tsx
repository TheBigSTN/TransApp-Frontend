"use client"
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlimentareData } from "@/models/Alimentare";
import { CellComponent } from "@/lib/columns";
import AlimentareForm from "@/forms/AlimentareForm";
import { KeyedMutator } from "swr";

export const columns = (mutate: KeyedMutator<AlimentareData[]>, currentValues: AlimentareData[]): ColumnDef<AlimentareData>[] => [
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
          Număr Mașină
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
    accessorKey: "dataAlimentare",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dată Alimentare
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataAlimentare")}</div>,
  },
  {
    accessorKey: "litri",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Litri
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("litri")}</div>,
  },
  {
    accessorKey: "pretUnitar",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preț Unitar
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("pretUnitar")}</div>,
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
        model="alimentare"
        mutate={mutate}
        currentValues={currentValues}
        row={row}
        Form={AlimentareForm} />
    },
  },
];
