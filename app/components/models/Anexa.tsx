"use server"

import api from "./Api";

export interface AnexaData {
  id: number;
  tipAnexa: string;
  kmTotal?: number;
  tarifMediu?: number;
  valoare?: number;
  tva?: number;
  idClient?: number;
  numeClient?: string;
}

export async function getAllDataAnexa(): Promise<AnexaData[]> {
  try {
    const { data } = await api.get<AnexaData[]>(`/anexa/all`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getDataAnexa(id: number): Promise<AnexaData> {
  try {
    const { data } = await api.get<AnexaData>(`/anexa/view/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function addAnexa(cursaIdsList: number[]): Promise<AnexaData> {
  try {
    const { data } = await api.post(`/anexa/add`, cursaIdsList);
    return data;
  } catch (error) {
    console.error('Error adding anexa:', error);
    throw error;
  }
}