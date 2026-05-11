"use server"

import api from "@/models/Api";
import axios from "axios";
import { cookies } from "next/headers";

export async function validateAnexa(id: number) {
  try {
    await axios.get(`${process.env.API_URL}/anexa/validate/${id}`, {
      headers: {
        Authorization: `Bearer ` + cookies().get("accessToken")?.value
      }
    });
  } catch (error) {
    console.error('Error creating anexa:', error);
    throw error;
  }
}

export async function generateAnexa(id: number) {
  try {
    const res = await axios.get(`${process.env.API_URL}/anexa/generate/${id}`, {
      // responseType: 'blob', // Set the response type to blob
      headers: {
        Authorization: `Bearer ` + cookies().get("accessToken")?.value
      }
    });
    console.log(res.data);
    return res.data; // Return the blob data
  } catch (error) {
    console.error('Error downloading PDF:', error);
    return null;
  }
}

type Model = 'sofer' | 'masina' | 'client' | 'cursa' | 'alimentare' | 'licenta' | 'anexa'

export async function deleteHandler<T extends { id: number }>(
  ids: number | number[],
  model: Model,
  currentValues: T[]
): Promise<T[]> {
  try {
    if (Array.isArray(ids)) {
      await Promise.allSettled(ids.map(id => api.delete(`/${model}/delete/${id}`,)));
      return currentValues.filter(item => !ids.includes(item.id));
    } else {

      await api.delete(`/${model}/delete/${ids}`);
      return currentValues.filter(item => item.id !== ids);
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

export async function add_editHandler<T extends { id: number }>(
  model: Model,
  currentValues: T[],
  payload: T
): Promise<T[]> {
  try {
    if (payload.id === 0) {
      const { data } = await api.post(`${model}/add`, payload)
      return [data, ...currentValues]
    } else {
      const { data } = await api.put(`${model}/update/${payload.id}`, payload)
      return [data, ...currentValues]
    }
  } catch (error) {
    throw error
  }
}