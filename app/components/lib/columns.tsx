import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { deleteHandler } from "../../_helper/helper copy";

type Model = 'sofer' | 'masina' | 'client' | 'cursa' | 'alimentare' | 'licenta' | 'anexa'

interface CellComponentProps<T> {
    model: Model,
    row: Row<T>,
    mutate: KeyedMutator<T[]>,
    currentValues: T[],
    Form: ({
        close,
        currentValues,
        defaultValues,
        mutate
    }: {
        close: () => void,
        currentValues: T[],
        defaultValues?: T,
        mutate: KeyedMutator<T[]>;
    }) => JSX.Element;
}

export function CellComponent<T extends { id: number }>({ row, Form, mutate, currentValues, model }: CellComponentProps<T>) {
    const [state, setstate] = useState(false);
    const data = row.original
    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "center", // Center horizontally
    };

    const buttonStyle: React.CSSProperties = {
        background: "transparent",
        fontSize: "0.8rem",
        padding: "0.5rem",
        border: "val(--primary)",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "-4px",
    };

    return (
        <div style={buttonContainerStyle}>
            <Dialog open={state} onOpenChange={setstate}>
                <DialogTrigger style={buttonStyle}>
                    <EditIcon size={16} stroke="currentColor" />
                </DialogTrigger>
                <DialogContent style={{ width: '550px', maxWidth: '90vw', justifyContent: "center" }}>
                    <Form defaultValues={data} close={() => setstate(false)} mutate={mutate} currentValues={currentValues} />
                </DialogContent>
            </Dialog>
            {/* Delete button */}
            <Dialog>
                <DialogTrigger style={buttonStyle}>
                    <DeleteIcon size={16} stroke="currentColor" />
                </DialogTrigger>
                <DialogContent className="glass-card bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl text-white">
                    <DialogHeader className="text-white">
                        <DialogTitle>Confirmare</DialogTitle>
                        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none text-white" />
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete the selected rows?
                    </DialogDescription>
                    <DialogFooter className="flex gap-2">
                        <Button onClick={() => {
                            mutate(
                                deleteHandler(
                                    row.original.id,
                                    model,
                                    currentValues
                                ), {
                                optimisticData: currentValues.filter((v) => v.id != row.original.id)
                            })
                        }}>
                            ȘTERGE
                        </Button>
                        <DialogClose>Anulează</DialogClose>
                    </DialogFooter>
                </DialogContent>
                <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
            </Dialog>
        </div>
    );
}