"use server"

import api from "@/models/Api";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function register(
    nume: string,
    prenume: string,
    email: string,
    password: string,
    companyName: string,
    companyDescription: string
) {
    try {
        const response = await api.post<{ token: string }>(`${process.env.API_URL}/api/v1/auth/account/register`, {
            firstname: nume,
            lastname: prenume,
            email: email,
            password: password,
            companyName: companyName,
            companyDescription: companyDescription
        });

        cookies().set({
            name: "accessToken",
            value: response.data.token,
            httpOnly: true,
            // secure: true,
            maxAge: 60 * 60 * 24
        })

        const payload = decode(response.data.token) as { role: string };

        cookies().set({
            name: "role",
            value: payload.role,
            httpOnly: false,
            // secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return {
            statusText: "Te ai inregistrat cu success",
            status: 200,
        }
    } catch (error) {
        console.log(error)
        return {
            statusText: "Am intalnit o eroare in timp ce adaugam userul. Incerca mai tarziu",
            status: 404
        }
    }
}