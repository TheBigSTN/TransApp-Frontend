import { FormEvent } from "react";


export function GetForm(e: FormEvent<HTMLFormElement>) {
    const formData = e.currentTarget.elements;

    const getFormDataValue = (key: string) => {
        const value = (formData.namedItem(key) as HTMLInputElement).value;
        if (typeof value !== "string") {
            return "";
        }
        return value;
    };

    return getFormDataValue;
}

export function GetAllForm<T>(e: FormEvent<HTMLFormElement>) {
    const formElements = e.currentTarget.elements;
    const data: Record<string, string> = {};

    for (const key in formElements) {
        if (isNaN(Number(key))) {
            const element = formElements.namedItem(key) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
            if (element) {
                data[key] = element.value;
            } else {
                data[key] = "";
            }
        }
    }


    return data as T
}