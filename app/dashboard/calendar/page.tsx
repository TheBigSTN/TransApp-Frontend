"use client"

import * as React from "react";
import { useState } from "react"
import { DataTable } from "@/components/ui/DataTables";
import { fetchDataAndPopulateCalendarPerWeek } from "./apis";
import generateColumns from "./columns";
import { DatePicker } from "./DatePicker";

function getStartDateOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay(); // Ziua săptămânii pentru data specificată (0 = Duminică, 1 = Luni, ..., 6 = Sâmbătă)
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajustează data pentru a ajunge la începutul săptămânii (Luni)
    return new Date(date.setDate(diff)); // Returnează data primei zile a săptămânii respective
}

export default function DataTablePage() {
    const [data, setData] = React.useState<any[]>([]);
    const [curentColumns, setCurentColumns] = React.useState<any[]>(generateColumns(getStartDateOfWeek(new Date())));
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const todayDate = new Date();
    const startDate = getStartDateOfWeek(todayDate);

    const [selectedDate, setSelectedDate] = useState<Date>(getStartDateOfWeek(todayDate));

    const handleDateChange = (date: Date) => {
        setSelectedDate(getStartDateOfWeek(date))
    }


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const thisWeek = await fetchDataAndPopulateCalendarPerWeek(selectedDate !== null ? (getStartDateOfWeek(selectedDate)) : (startDate));
                setData(thisWeek);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Connectarea la baza de date a eșuat. Vă rugăm contactați administratorul.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        setCurentColumns(generateColumns(getStartDateOfWeek(selectedDate)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className=" flex text-xl font-bold mb-0 text-center">Calendar săptămânal</h1>
                <DatePicker onDateChange={handleDateChange} />
            </div>
            {isLoading && <p className="text-center">Datele sunt în curs de încărcare...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <DataTable
                columns={curentColumns}
                data={data}
                model="calendar"
                idKey="id_masina"
            />
        </div>
    );
};