"use server"

import { cookies } from "next/headers"

export async function RemoveCookie() {
    cookies().delete("accessToken")
}