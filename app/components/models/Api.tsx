"use server"

import axios from 'axios';
import { cookies } from 'next/headers';

const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        // Get a fresh instance of cookies for each request
        const token = cookies().get("accessToken")?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        // Check for authentication related errors
        if (error.response?.status === 401 && error.response?.data?.message?.includes("Token expired")) {
            cookies().delete("accessToken");
            // Redirect to the sign-in pages
            return Promise.reject(new Error("Auth_Redirect"));
        }

        // if (!(error instanceof Error && error.message.includes("NEXT_REDIRECT"))) {
        //     console.error("API Error:", error);
        // }

        return Promise.reject(error);
    }
);

export default api;