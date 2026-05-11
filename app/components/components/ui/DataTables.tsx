"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, ChevronDown, SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteHandler } from "app/_helper/helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import { addAnexa } from "@/models/Anexa";
import { useRouter } from "next/navigation";
import { useState } from "react";

const buttonStyle = {
  background: "white",
  color: "black",
  fontSize: "0.8rem",
  padding: "0.5rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "-4px", // Adjust the margin to remove the gap between buttons
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  model: string;
  idKey: keyof TData;
  Addform?: ({ close }: { close: () => void }) => JSX.Element;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  model,
  idKey,
  Addform,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dialogstate, setDialogstate] = useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const getSelectedRowIds = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    return selectedRows.map((row) => Number(row.original[idKey]));
  };

  var filterValue;

  return (
    <div className="w-full">
      {model !== "calendar" && (
        <div className="flex items-center py-4">
          <Input
            name="search"
            placeholder="Căutați..."
            value={filterValue}
            onChange={(event) => {
              filterValue = event.target.value;
              table.setGlobalFilter(filterValue);
            }}
          />
          {Addform ?
            <Dialog open={dialogstate} onOpenChange={setDialogstate}>
              <DialogTrigger className="h-10 px-2 py-2 border rounded-md">
                <SquarePlusIcon
                  size={16}
                  stroke="currentColor"
                  style={{ height: "100%" }}
                />
              </DialogTrigger>
              <DialogContent style={{ width: "550px", maxWidth: "90vw" }}>
                <DialogTitle>
                  {model.charAt(0).toUpperCase() + model.slice(1)}
                </DialogTitle>
                <Addform close={() => setDialogstate(false)} />
              </DialogContent>
            </Dialog>
            : // Or
            <Link href={`/${model}/add`} className="h-10 px-2 py-2 border rounded-md" style={{ display: "grid", alignItems: "center" }}>
              <SquarePlusIcon size={16} color="currentColor" name="redirect" />
            </Link>
          }
          {model === "curse" ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                addAnexa(getSelectedRowIds());
                router.push(`/anexe`);
              }}
            > Crează anexă din cursele selectate
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild className="h-10 px-4 py-2">
                <Button
                  size="sm"
                  variant="outline"
                  style={{ textWrap: "nowrap" }} >
                  Ștergeți rândurile selectate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmare</DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <DialogDescription>
                  Sunteți sigur că vreți să ștergeți rândurile selectate?
                </DialogDescription>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      deleteHandler(getSelectedRowIds(), model);
                      window.location.reload();
                    }} >
                    ȘTERGE
                  </Button>
                  <DialogClose onClick={() => setRowSelection({})}>
                    Anulează
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Coloane <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nu există date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} din{" "}
          {table.getFilteredRowModel().rows.length} rând(uri) selectate.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterioara
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Următoarea
          </Button>
        </div>
      </div>
    </div>
  );
}
