"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MasinaForm from "@/forms/MasinaForm";
import { CellComponent } from "@/lib/columns";
import { MasinaData } from "@/models/Masina";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { KeyedMutator } from "swr";

export const columns = (mutate: KeyedMutator<MasinaData[]>, currentValues: MasinaData[]): ColumnDef<MasinaData>[] => [
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
    accessorKey: "numar",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Număr
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("numar")}</div>,
  },
  {
    accessorKey: "serie",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serie
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("serie")}</div>,
  },
  {
    accessorKey: "capacitateTransport",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacitatea de transport  (tone)
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("capacitateTransport")}</div>,
  },
  {
    accessorKey: "capacitateCombustibil",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacitate combustibil (litri)
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("capacitateCombustibil")}</div>,
  },
  {
    accessorKey: "tipauto",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tip Vehicul
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("tipauto")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <CellComponent
        model="masina"
        row={row}
        Form={MasinaForm}
        mutate={mutate}
        currentValues={currentValues}
      />
    },
  },
];
