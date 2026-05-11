"use server"

import api from "./Api";

export interface ClientData {
  id: number;
  nume: string;
  cui: string;
  adresaFacturare?: string;
  adresaCorespondenta?: string;
  cod?: string;
  cont?: string;
  banca?: string;
  contact?: string;
  email?: string;
  telefon: string;
}

export async function getAllDataClient(): Promise<ClientData[]> {
  try {
    const { data } = await api.get<ClientData[]>(`/client/all`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getDataClient(id: number): Promise<ClientData> {
  try {
    const { data } = await api.get<ClientData>(`/client/view/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function addClient(client: ClientData): Promise<ClientData> {
  try {
    const { data } = await api.post<ClientData>(`/client/add`, client);
    return data;
  } catch (error) {
    console.error('Error adding client:', error);
    throw error;
  }
}

export async function updateClient(id: number, client: ClientData): Promise<ClientData> {
  try {
    const { data } = await api.put<ClientData>(`/client/update/${id}`, client);
    return data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}
