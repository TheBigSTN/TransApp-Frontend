"use server"

import api from "./Api";

export interface SoferData {
  id: number;
  nume: string;
  prenume: string;
  dataNastere: string;
  cnp: string;
  seriePermis: string;
  dataEmiterePermis: string;
  dataExpirarePermis: string;
  adresa: string;
  telefon: string;
  email: string;
}


export async function getAllDataSofer(): Promise<SoferData[]> {
  try {
    const response = await api.get<SoferData[]>(`/sofer/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDataSofer(id: number): Promise<SoferData> {
  try {
    const response = await api.get<SoferData>(`/sofer/view/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addSofer(sofer: SoferData): Promise<SoferData> {
  try {
    const response = await api.post<SoferData>(`/sofer/add`, sofer);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateSofer(id: number, sofer: SoferData): Promise<SoferData> {
  try {
    const response = await api.put<SoferData>(`/sofer/update/${id}`, sofer);
    return response.data;
  } catch (error) {
    throw error;
  }
}