"use server"

import api from './Api';

export interface AlimentareData {
  id: number;
  masinaId: number;
  masinaNumar: string; //numar masina
  dataAlimentare: string;
  litri: number;
  pretUnitar: number;
  tip: string;
}

export async function getAllDataAlimentare(): Promise<AlimentareData[]> {
  try {
    const { data } = await api.get<AlimentareData[]>(`/alimentare/all`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getDataAlimentare(id: number): Promise<AlimentareData> {
  try {
    const { data } = await api.get<AlimentareData>(`/alimentare/view/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function addAlimentare(alimentare: AlimentareData): Promise<AlimentareData> {
  try {
    const { data } = await api.post(`/alimentare/add`, alimentare);
    return data;
  } catch (error) {
    console.error('Error adding alimentare:', error);
    throw error;
  }
}

export async function updateAlimentare(id: number, alimentare: AlimentareData): Promise<AlimentareData> {
  try {
    const { data } = await api.put(`/alimentare/update/${id}`, alimentare);
    return data;
  } catch (error) {
    console.error('Error updating alimentare:', error);
    throw error;
  }
}

