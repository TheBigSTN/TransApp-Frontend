"use client";

import "app/account/signin/style.css"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addAnexa } from "@/models/Anexa";
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
import { deleteHandler } from "app/_helper/helper copy";
import { ChevronDown, SquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

type Model = 'sofer' | 'masina' | 'client' | 'cursa' | 'alimentare' | 'licenta' | 'anexa' | "calendar"

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: (mutate: KeyedMutator<TData[]>, currentValues: TData[]) => ColumnDef<TData, TValue>[]
  model: Model;
  idKey: keyof TData;
  Addform: ({ close, currentValues, mutate }: { close: () => void, currentValues: TData[], mutate: KeyedMutator<TData[]>; }) => JSX.Element;
  GetData: () => Promise<TData[]>;
}

export function DataTable<TData extends { id: number }, TValue>({
  columns,
  model,
  idKey,
  Addform,
  GetData,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dialogstate, setDialogstate] = useState(false);
  const [otherdialog, setotherdialog] = useState(false)
  const {
    isLoading,
    data = [],
    error,
    mutate
  } = useSWR(model, GetData, {
    onSuccess: data => data.reverse(),
  })

  React.useEffect(() => {
    if (error) {
      if (error.message === "Auth_Redirect") {
        window.location.reload();
      }
    }
  }, [error])

  const table = useReactTable({
    data,
    columns: columns(mutate, data),
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
    <div className="w-full h-full">
      {model !== "calendar" && (
        <div className="flex items-center py-4 flex-wrap sm:flex-nowrap">
          <Input
            name="search"
            placeholder="Căutați..."
            value={filterValue}
            onChange={(event) => {
              filterValue = event.target.value;
              table.setGlobalFilter(filterValue);
            }}
            className="glass text-white placeholder-white/60"
          />
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
              <Addform
                close={() => setDialogstate(false)}
                mutate={mutate}
                currentValues={data}
              />
            </DialogContent>
          </Dialog>
          {model === "cursa" ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                addAnexa(getSelectedRowIds());
                router.push(`/dashboard/anexe`);
              }}
              className="glass"
            > Crează anexă din cursele selectate
            </Button>
          ) : (
            <Dialog open={otherdialog} onOpenChange={setotherdialog}>
              <DialogTrigger asChild className="h-10 px-4 py-2">
                <Button
                  size="sm"
                  variant="outline"
                  style={{ textWrap: "nowrap" }}
                  className="glass">
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
                      var ids = getSelectedRowIds()
                      mutate(
                        deleteHandler(ids, model, data), {
                        optimisticData: data.filter((item) => !getSelectedRowIds().includes(item.id))
                      })
                      setotherdialog(false)
                      setRowSelection({})
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
              <Button variant="outline" className="ml-auto glass">
                Coloane <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize glass"
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
      <div className="rounded-md border overflow-y-auto max-w-[100vw]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
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
            {isLoading ? (
              // Show skeleton rows while loading
              Array(5)
                .fill(0)
                .map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {table.getAllColumns().map((_, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <Skeleton className="w-full h-6" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-white">
                  Nu există date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-white">
          {table.getFilteredSelectedRowModel().rows.length} din{" "}
          {table.getFilteredRowModel().rows.length} rând(uri) selectate.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="glass"
          >
            Anterioara
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="glass"
          >
            Următoarea
          </Button>
        </div>
      </div>
    </div>
  );
}
