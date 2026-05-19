"use server"

import { cookies } from "next/headers"
import api from "./Api";
import jwt, { decode } from "jsonwebtoken";

export async function signIn(email: string, password: string) {
    try {
        const response = await api.post<{ token: string }>(
            `${process.env.API_URL}/api/v1/auth/authenticate`,
            {
                email: email,
                password: password,
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        cookies().set({
            name: "accessToken",
            value: response.data.token,
            httpOnly: true,
            // secure: true,
            maxAge: 60 * 60 * 24
        })

        const payload = jwt.decode(response.data.token) as { role: string };

        cookies().set({
            name: "role",
            value: payload.role,
            httpOnly: false,       // pentru că UI trebuie să-l citească
            // secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });


        return payload.role;
    } catch (error) {
        throw new Error("Parola / Email Gresit")
    }
}

export async function getUserdetails() {
    if (!cookies().has("accessToken")) {
        throw new Error("Unauthorized")
    }
    try {
        const res = await api.get(`/api/v1/auth/user`)
        return res.data
    } catch (error) {
        throw error;
    }
}

export async function updateuserpassword(password: string, newpassword: string) {
    try {
        const payload = {
            currentPassword: password,
            newPassword: newpassword
        }
        const res = await api.post(`${process.env.API_URL}/api/v1/reset-password`, payload)
        return res.data
    } catch (error) {
        throw error;
    }
}

export async function isLogedIn() {
    return cookies().has("accessToken");
}

export async function addNewUser(
    nume: string,
    prenume: string,
    email: string,
    password: string,
    role: string
) {
    try {
        await api.post(`${process.env.API_URL}/api/v1/auth/register`, {
            body: {
                firstname: nume,
                lastname: prenume,
                email: email,
                password: password,
                role: role
            }
        });

        return {
            statusText: "Ai adaugat un user cu success",
            status: 200,
        }
    } catch (error) {
        return {
            statusText: "Am intalnit o eroare in timp ce adaugam userul. Incerca mai tarziu",
            status: 404
        }
    }
}

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