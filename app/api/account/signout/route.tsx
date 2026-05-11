import { cookies } from "next/headers";

export async function GET() {
    if (!cookies().has("accessToken")) {
        return Response.json (
            JSON.stringify({
                statusText:"You need you be loged in",
                status:200,
            }),{ status:200 }
        ) 
    } else {
        return Response.json (
            JSON.stringify({
                statusText:"Success",
                status:200,
            }),{
                status:200,
                headers: { 
                    'Set-Cookie': `accessToken=1; HttpOnly=true; Max-Age=1; Path=/; Secure` 
                }
            }
        )
    }
}