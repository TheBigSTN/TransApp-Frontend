import { Stat } from "@chakra-ui/react";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    if (!cookies().has("accessToken")) {
        return Response.json (
            JSON.stringify({
                statusText:"Nu poti sa adaugi utilizatori noi daca nu esti connectat",
                status:216,
            }),{
                status:216
            }
        )
    }

    const { email, password, nume, prenume, stat } = await request.json()
    var stats
    switch (stat) {
        case "Utilisator":stats = "USER"; break
        case "Administrator": stats = "ADMIN";break
    }

    const res = await fetch(`${process.env.API_URL}/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            firstname:nume,
            lastname:prenume,
            email: email,
            password: password,
            role:stats
    }),
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + cookies().get("accessToken")?.value
        }
    });

    if (!(res && res.ok)) {
        return Response.json (
            {
                statusText: "Am intalnit o erroare in timp ce adaugam userul. Incerca mai tarziu",
                status:404            
            },
            {
                status: res.status
            }
        )
    }

    return Response.json (
        JSON.stringify({
            statusText:"Ai adaugat un ser cu success",
            status:200,
        }),{
            status:200,
        }
    )
    

}
