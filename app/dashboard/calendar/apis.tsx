"use server"

import { AlimentareData } from "@/models/Alimentare";
import { CursaData } from "@/models/Cursa";
import { LicentaData } from "@/models/Licenta";
import axios, { AxiosResponse } from "axios";
import { getAllDataMasina } from "@/models/Masina";

import { cookies } from "next/headers";
import { AlimentareCell, CalendarMainCell, CalendarRow, CursaCell, LicentaCell } from "./cellComponents";

function convertAlimentareDataToCell(alimentariList:AlimentareData[]): AlimentareCell[] {
  return alimentariList.map(alimentare => {
      const newAlimentare = {
          id: alimentare.id,
          tip: alimentare.tip,
          litri: alimentare.litri,
          pret: alimentare.pretUnitar * alimentare.litri  
      };
      return newAlimentare;
  });
}

function convertLicentaDataToCell(licentaDataList : LicentaData[]) : LicentaCell[] {
  return licentaDataList.map(licenta => {
      const newLicentaCell = {
          id: licenta.id,
          tip: licenta.tip,
          data_inceput: new Date(licenta.data_inceput),
          data_final: new Date(licenta.data_final)
      };
      return newLicentaCell;
  });
}

function getNext7Days(startDate: Date): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
  }
  return dates;
}

export async function fetchDataAndPopulateCalendarPerWeek(startDate: Date): Promise<CalendarRow[]> {
    try {
        const endStringDate =   formatDateToString(getEndDateOfWeek(startDate));
        const startStringDate = formatDateToString(startDate);

        const masini = await getAllDataMasina();
        const alimentari = await getAlimentarePerioada(startStringDate, endStringDate);
        const curse = await getCursaPerioada(startStringDate, endStringDate);
        const licente = await getLicentaPerioada(startStringDate, endStringDate);
    
        const calendarRows: CalendarRow[] = [];
    
        masini.forEach(masina => {
            const calendarMainCells: CalendarMainCell[] = [];
            const datesArray = getNext7Days(startDate);

            datesArray.forEach(date => {
                const strindDate = formatDateToString(date);

                const curseForMasina: CursaCell[] = curse.filter(cursa => cursa.dataEfectuare === strindDate && cursa.idMasina === masina.id);
                const alimentariForMasina: AlimentareData[] = alimentari.filter(alimentare => alimentare.dataAlimentare === strindDate && alimentare.masinaId === masina.id);
                const licenteForMasina: LicentaData[] = licente.filter(licenta => (licenta.data_final === strindDate || licenta.data_inceput === strindDate) && licenta.masinaId === masina.id);
                
                if (curseForMasina.length > 0 || alimentariForMasina.length > 0 || licenteForMasina.length > 0) {
                  calendarMainCells.push({
                      curse: curseForMasina,
                      alimentari: convertAlimentareDataToCell(alimentariForMasina),
                      licente: convertLicentaDataToCell(licenteForMasina),
                      data: new Date(date)
                  });
                }               
            });

            if (calendarMainCells.length != 0) {
                calendarRows.push({
                    id_masina: masina.id,
                    numar_masina: masina.numar,
                    cells: calendarMainCells
                });
          }
        });
    
        return calendarRows;
    } catch (error) {
        console.error('Error fetching data and populating calendar:', error);
        throw error;
    }
}

function getEndDateOfWeek(startDate:Date) : Date{
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return endDate;
}


  function formatDateToString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  
export async function getCursaPerioada(startDate: string, endDate: string): Promise<CursaData[]> {
    try {
      
        const response: AxiosResponse<CursaData[]> = await axios.get(`${process.env.API_URL}/cursa/perioada`, {
            params: { startDate, endDate },
            headers: {
              Authorization: `Bearer ` + cookies().get("accessToken")?.value
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Cursa data:', error);
        throw error;
    }
}

export async function getAlimentarePerioada(startDate: string, endDate: string): Promise<AlimentareData[]> {
    try {
        const response: AxiosResponse<AlimentareData[]> = await axios.get(`${process.env.API_URL}/alimentare/perioada`, {
            params: { startDate, endDate },
            headers: {
              Authorization: `Bearer ` + cookies().get("accessToken")?.value
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Alimentare data:', error);
        throw error;
    }
}

export async function getLicentaPerioada(startDate: string, endDate: string): Promise<LicentaData[]> {
    try {
        const response: AxiosResponse<LicentaData[]> = await axios.get(`${process.env.API_URL}/licenta/perioada`, {
            params: { startDate, endDate },
            headers: {
              Authorization: `Bearer ` + cookies().get("accessToken")?.value
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Licenta data:', error);
        throw error;
    }
}

