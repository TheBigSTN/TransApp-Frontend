import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { GetAllForm } from "@/lib/formdata";
import React, { ReactElement, useState } from "react";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type LiteralUnion<T extends U, U = string> = T | (U & { _?: never });

export interface FormFieldProps extends Omit<InputProps, 'type'> {
    label: string;
    id: LiteralUnion<string>;
    fieldType: 'input' | 'dropdown' | 'submit';
    type?: InputProps['type'];
    buttonText?: string;
    options?: string[];
}

type ExtractIds<T> = T extends { id: infer ID } ? ID : never;

export type InferFormData<T extends readonly FormFieldProps[]> = Prettify<{
    [K in ExtractIds<T[number]> & string]: string;
}>;

interface FormProps<T extends readonly FormFieldProps[]> {
    fields: T;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, data: InferFormData<T>) => void;
}

export const Form = <T extends readonly FormFieldProps[]>({
    fields,
    onSubmit,
    children,
    style,
    ...props
}: FormProps<T> & Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'>) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = GetAllForm(e) as InferFormData<T>;
        onSubmit(e, formData);
    };

    // Convert children to a map based on their `id` prop
    const customComponents = React.Children.toArray(children).reduce<Record<string, ReactElement>>((acc, child) => {
        if (React.isValidElement(child) && child.props.id) {
            acc[child.props.id] = child;
        }
        return acc;
    }, {});

    const hasSubmitButton = fields.some(field => field.fieldType === 'submit') ||
        Object.keys(customComponents).includes('submit');

    return (
        <form {...props} style={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", ...style }} onSubmit={handleSubmit}>
            {fields.map((field) => {
                if (customComponents[field.id]) {
                    return (
                        <div key={field.id} style={{ flex: "1 1 250px", padding: "10px", boxSizing: "border-box" }}>
                            {customComponents[field.id]}
                        </div>
                    );
                }

                switch (field.fieldType) {
                    case 'dropdown':
                        return <DropdownField key={field.id} {...field} />;
                    case 'submit':
                        return <SubmitButton key={field.id} buttonText={field.buttonText} />;
                    default:
                        return <InputField key={field.id} {...field} />;
                }
            })}
            {!hasSubmitButton && <SubmitButton />}
        </form>
    );
};

export const InputField = ({ label, fieldType, type = 'text', ...props }: FormFieldProps) => {
    return (
        <div style={{ flex: "1 1 250px", padding: "10px", boxSizing: "border-box" }}>
            <Label htmlFor={props.id}>{label}</Label>
            <Input type={type} {...props} />
        </div>
    );
};

export const DropdownField = ({ label, id, options = [], defaultValue, onChange }: FormFieldProps) => {
    const [selected, setSelected] = useState<string>(defaultValue as string || options[0]);

    const handleSelect = (value: string) => {
        setSelected(value);
        // Create a synthetic event to simulate input change
        const event = new Event('input', { bubbles: true });
        const element = document.getElementById(id);
        if (element) {
            Object.defineProperty(event, 'target', { value: { value, id } });
            element.dispatchEvent(event);
        }
    };

    return (
        <div style={{ flex: "1 1 250px", padding: "10px", boxSizing: "border-box" }}>
            <Label htmlFor={id}>{label}</Label>
            <input type="hidden" id={id} value={selected} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                        {selected || "Select..."}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                    <DropdownMenuRadioGroup value={selected} onValueChange={handleSelect}>
                        {options.map((option) => (
                            <DropdownMenuRadioItem key={option} value={option}>
                                {option}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const SubmitButton = ({ buttonText = "Salvează" }: { buttonText?: string }) => (
    <div style={{ flex: "1 1 250px", padding: "10px", boxSizing: "border-box" }}>
        <Button type="submit" className="w-full">
            {buttonText}
        </Button>
    </div>
);

export default Form;