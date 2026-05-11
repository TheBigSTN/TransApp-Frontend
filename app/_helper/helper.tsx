"use server"

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
      responseType: 'arraybuffer', // Set the response type to blob
      headers: {
        Authorization: `Bearer ` + cookies().get("accessToken")?.value
      }
    });
    return res.data; // Return the blob data
  } catch (error) {
    console.error('Error downloading PDF:', error);
    return null;
  }
}

type Model = 'soferi' | 'masini' | 'clienti' | 'curse' | 'alimentari' | 'licente' | 'anexe'

export async function deleteHandler(ids: number | number[], model: string): Promise<void> {
  try {
    var type: string = '';
    switch (model) {
      case 'soferi': type = 'sofer'; break;
      case 'masini': type = 'masina'; break;
      case 'clienti': type = 'client'; break;
      case 'curse': type = 'cursa'; break;
      case 'alimentari': type = 'alimentare'; break;
      case 'licente': type = 'licenta'; break;
      case 'anexe': type = 'anexa'; break;
    }

    if (Array.isArray(ids)) {
      // If ids is an array, delete multiple rows
      await Promise.all(ids.map(id => axios.delete(`${process.env.API_URL}/${type}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ` + cookies().get("accessToken")?.value
        }
      })));
    } else {
      // If ids is a single number, delete a single row
      await axios.delete(`${process.env.API_URL}/${type}/delete/${ids}`, {
        headers: {
          Authorization: `Bearer ` + cookies().get("accessToken")?.value
        }
      });
    }

  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}