"use server"

import { AxiosError } from "axios";
import api from "./Api"

export interface MasinaData {
  numar: string;
  serie: string;
  capacitateTransport: number;
  capacitateCombustibil: number;
  tipauto: string
  status: string;
  id: number;
}

export async function getAllDataMasina(): Promise<MasinaData[]> {
  try {
    const { data, statusText } = await api.get<MasinaData[]>(`/masina/all`);
    console.log(statusText)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDataMasina(id: number): Promise<MasinaData> {
  try {
    const { data } = await api.get<MasinaData>(`/masina/view/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addMasina<MasinaData>(masina: MasinaData): Promise<MasinaData> {
  try {
    const { data } = await api.post(`/masina/add`, masina);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateMasina<MasinaData>(id: number, masina: MasinaData): Promise<MasinaData> {
  try {
    const { data } = await api.put(`/masina/update/${id}`, masina);
    return data;
  } catch (error) {
    throw error;
  }
}
