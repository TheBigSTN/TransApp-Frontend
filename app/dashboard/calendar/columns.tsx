"use client"

import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { CalendarMainCell, CalendarRow } from "./cellComponents";

const daysOfWeek = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];

// Function to generate column headers dynamically based on the provided week and year
const generateColumns = (startDate:Date): ColumnDef<CalendarRow>[] => {
 
  const columns: ColumnDef<CalendarRow>[] = [
    {
      accessorKey: 'numar_masina', // Unique key for the car number column
      header: 'Mașină', // Header title for the car number column
      cell: ({ row }: { row: Row<CalendarRow> }) => row.original.numar_masina // Accessor function for cell data
    }
  ];

  // Generate columns for each day of the week
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i); // Get the date for each day of the week

    const dayName = daysOfWeek[i];
    const formattedDate = currentDate.toLocaleDateString('ro-RO', { month: 'short', day: 'numeric' });
  

    columns.push({
      accessorKey: dayName.toLowerCase(), // Unique key for each column
      header: `${dayName} (${formattedDate})`, // Header title for the day
      cell: ({ row }: { row: Row<CalendarRow> }) => {
          const cellData = row.original.cells.find(cell => cell.data.toISOString() === currentDate.toISOString());
          if (cellData) {
            return (
              <div>
                {/* Display all "curse" */}
                {cellData.curse.length > 0 ? (
                  <div>
                    <div><strong>Curse:</strong></div>
                    {cellData.curse.map(cursa => (
                      <div key={cursa.id}>{cursa.livrare} - {cursa.km} km</div>
                    ))}
                  </div>
                ) : null}
      
                {/* Display all "alimentari" */}
                {cellData.alimentari.length > 0 ? (
                  <div>
                    <div><strong>Alimentări:</strong></div>
                    {cellData.alimentari.map(alimentare => (
                      <div key={alimentare.id}>{alimentare.tip} - {alimentare.pret.toFixed(2)} RON</div>
                    ))}
                  </div>
                ) : null}
      
                {/* Display all "licente" */}
                {cellData.licente.length > 0 ? (
                  <div>
                    <div><strong>Licențe:</strong></div>
                    {cellData.licente.map(licenta => (
                      <div key={licenta.id}>
                        {licenta.tip} - {new Date(licenta.data_inceput).toLocaleDateString()} to {new Date(licenta.data_final).toLocaleDateString()}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          } else {
            return <div></div>;
          }
        }
    });
  }

  return columns;
}

export default generateColumns;
