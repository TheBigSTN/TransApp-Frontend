"use client"

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteHandler, generateAnexa, validateAnexa } from "app/_helper/helper";
import { AnexaData } from "@/models/Anexa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { KeyedMutator } from "swr";


export const columns = (mutate: KeyedMutator<AnexaData[]>, currentValues: AnexaData[]): ColumnDef<AnexaData>[] => [
  {
    accessorKey: "idAnexa",
    header: "ID Anexa",
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    accessorKey: "tipAnexa",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tip Anexa
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("tipAnexa")}</div>,
  },
  {
    accessorKey: "numeClient",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nume Client
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("numeClient")}</div>,
  },
  {
    accessorKey: "kmTotal",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kilometri Total
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("kmTotal")}</div>,
  },
  {
    accessorKey: "tarifMediu",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarif Mediu
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("tarifMediu")}</div>,
  },
  {
    accessorKey: "valoare",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valoare
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("valoare")}</div>,
  },
  {
    accessorKey: "tva",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TVA
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() === "asc" ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("tva")}</div>,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const anexa = row.original;
      const buttonContainerStyle = {
        display: "flex",
        justifyContent: "center",
      };

      const buttonStyle = {
        background: "white",
        color: "black",
        fontSize: "0.8rem",
        padding: "0.5rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "-4px",
      };

      // const downloadPdf = async (id: number) => {
      //   try {
      //     const blob = new Blob([await generateAnexa(id)], { type: 'application/pdf' });
      //     // const blob = await generateAnexa(id);
      //     if (blob) {
      //       console.log('isBlob:', blob instanceof Blob);
      //       console.log('type:', typeof blob);
      //       const url = window.URL.createObjectURL(blob);
      //       const a = document.createElement('a');
      //       a.href = url;
      //       a.download = 'generated_pdf.pdf'; // Set the filename for the downloaded file
      //       document.body.appendChild(a);
      //       a.click();
      //       window.URL.revokeObjectURL(url);
      //     }
      //   } catch (error) {
      //     console.error('Error downloading PDF:', error);
      //   }
      // };
      const downloadPdf = async (id: number) => {
        try {
          const data = await generateAnexa(id);

          if (!data) {
            console.error("No data");
            return;
          }

          // 🔥 CRITICAL: asigură-te că e ArrayBuffer
          const buffer = data instanceof ArrayBuffer
            ? data
            : new Uint8Array(data).buffer;

          const blob = new Blob([buffer], { type: 'application/pdf' });

          console.log('isBlob:', blob instanceof Blob);

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'generated_pdf.pdf';

          document.body.appendChild(a);
          a.click();

          a.remove();
          window.URL.revokeObjectURL(url);

        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };

      return (
        <div style={buttonContainerStyle}>
          <div>
            {row.original.tipAnexa === 'VALIDATA' ? (
              <Button style={buttonStyle} onClick={() => {
                downloadPdf(row.original.id);
              }}>
                DOWNLOAD PDF ANEXA
              </Button>) : (null)}
            {row.original.tipAnexa === 'VALIDATA' ? (

              <Button style={buttonStyle} onClick={() => {
                validateAnexa(row.original.id);
                window.location.reload();
                console.log("edit clicked");
              }}>
                INVALIDEAZA
              </Button>) : (
              <Button style={buttonStyle} onClick={() => {
                validateAnexa(row.original.id);
                window.location.reload();
                console.log("edit clicked");
              }}>
                VALIDEAZA
              </Button>
            )}
          </div>
          {/* Edit button */}
          <div>
            <Link href={`/anexa/edit/${anexa.id}`}>
              <Button style={buttonStyle} onClick={() => {

                console.log("edit clicked");
              }}>
                <EditIcon size={16} color="black" />
              </Button>
            </Link>
          </div>
          {/* Delete button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button style={buttonStyle}>
                <DeleteIcon size={16} color="black" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmare</DialogTitle>
                <DialogClose />
              </DialogHeader>
              <DialogDescription>
                {"Are you sure you want to delete the selected rows?"}
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => { deleteHandler(row.original.id, "anexe"); }}>
                  ȘTERGE
                </Button>
                <DialogClose>Anulează</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      );
    },
  },
];
