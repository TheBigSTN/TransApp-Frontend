import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { deleteHandler } from "app/_helper/helper copy";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useState } from "react";
import { KeyedMutator } from "swr";

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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmare</DialogTitle>
                        <DialogClose />
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete the selected rows?
                    </DialogDescription>
                    <DialogFooter>
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
            </Dialog>
        </div>
    );
}