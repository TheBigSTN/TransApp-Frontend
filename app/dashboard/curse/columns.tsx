"use client"
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CursaData } from "@/models/Cursa";
import { CellComponent } from "@/lib/columns";
import CursaForm from "@/forms/CursaForm";
import { KeyedMutator } from "swr";

export const columns = (mutate: KeyedMutator<CursaData[]>, currentValues: CursaData[]): ColumnDef<CursaData>[] => [
  {
    id: "select",
    header: function SelectHeader({ table }) {
      const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original);

      const selectableRows = table
        .getRowModel()
        .rows
        .filter(row => isSelectable(row.original, selectedRows));

      const allSelected =
        selectableRows.length > 0 &&
        selectableRows.every(row => row.getIsSelected());

      const someSelected =
        selectableRows.some(row => row.getIsSelected()) && !allSelected;

      return (
        <Checkbox
          checked={allSelected || (someSelected && "indeterminate")}
          onCheckedChange={(value: boolean) => {
            selectableRows.forEach(row => {
              const canSelect = isSelectable(
                row.original,
                selectedRows
              );

              if (canSelect) {
                row.toggleSelected(!!value);
              }
            });
          }}
          aria-label="Select all"
        />
      );
    },
    cell: function SelectCell({ row, table }) {
      const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original);

      const disabled =
        !!row.original.idAnexa ||
        !isSelectable(row.original, selectedRows);

      return (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={disabled}
          onCheckedChange={(value: boolean) => {
            if (disabled) return;
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "livrare",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Adresă de livrare
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("livrare")}</div>,
  }
  ,
  {
    accessorKey: "km",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Număr kilometri
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("km")}</div>,
  },
  {
    accessorKey: "dataEfectuare",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de livrare
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataEfectuare")}</div>,
  },
  {
    accessorKey: "masinaNumar",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mașină
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
    accessorKey: "numeSofer",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Șofer
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("numeSofer")}</div>,
  },
  {
    accessorKey: "numeClient",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("numeClient")}</div>,
  },
  {
    accessorKey: "tarif",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarif
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("tarif")}</div>,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <CellComponent
        model="cursa"
        row={row}
        Form={CursaForm}
        mutate={mutate}
        currentValues={currentValues}
      />
    },
  },
];

const isSelectable = (row: CursaData, selectedRows: CursaData[]) => {
  if (row.idAnexa) return false;

  if (selectedRows.length === 0) return true;

  const selectedClientId = selectedRows[0].idClient;
  return row.idClient === selectedClientId;
};