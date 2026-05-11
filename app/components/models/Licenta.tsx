"use server"

import api from './Api';

export interface LicentaData {
  id: number;
  masinaId: number,
  masinaNumar: string,
  data_inceput: string;
  data_final: string;
  tip: string;
}

export async function getAllDataLicenta(): Promise<LicentaData[]> {
  try {
    const { data } = await api.get<LicentaData[]>(`/licenta/all`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getDataLicenta(id: number): Promise<LicentaData> {
  try {
    const { data } = await api.get<LicentaData>(`/licenta/view/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function addLicenta(licenta: LicentaData): Promise<LicentaData> {
  try {
    const { data } = await api.post(`/licenta/add`, licenta);
    return data;
  } catch (error) {
    console.error('Error adding licenta:', error);
    throw error;
  }
}

export async function updateLicenta(id: number, licenta: LicentaData): Promise<LicentaData> {
  try {
    const { data } = await api.put<LicentaData>(`/licenta/update/${id}`, licenta);
    return data;
  } catch (error) {
    console.error('Error updating licenta:', error);
    throw error;
  }
}