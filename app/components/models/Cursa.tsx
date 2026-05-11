"use server"

import api from './Api';

export interface CursaData {
  id: number;
  km: number;
  dataEfectuare: string;
  idMasina: number;
  idSofer: number;
  idClient: number;
  idAnexa: number | null;
  masinaNumar: string;
  numeSofer: string;
  numeClient: string;
  livrare: string;
  tarif: number;
}

export async function getAllDataCursa(): Promise<CursaData[]> {
  try {
    const { data } = await api.get<CursaData[]>(`/cursa/all`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getDataCursa(id: number): Promise<CursaData> {
  try {
    const { data } = await api.get<CursaData>(`/cursa/view/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function addCursa(cursa: CursaData): Promise<CursaData> {
  try {
    const { data } = await api.post<CursaData>(`/cursa/add`, cursa);
    return data;
  } catch (error) {
    console.error('Error adding cursa:', error);
    throw error;
  }
}

export async function updateCursa(id: number, cursa: CursaData): Promise<CursaData> {
  try {
    const { data } = await api.put<CursaData>(`/cursa/update/${id}`, cursa);
    return data;
  } catch (error) {
    console.error('Error updating cursa:', error);
    throw error;
  }
}
