import { cookies } from "next/headers";

export async function POST(request: Request) {
    if (cookies().has("accessToken")) {
        return Response.json (
            JSON.stringify({
                statusText:"Already loged",
                status:216,
            }),{
                status:216
            }
        )   
    }
    const { email, password } = await request.json()

    const res = await fetch(`${process.env.API_URL}/api/v1/auth/authenticate`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
    }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    const { token } = await res.json();

    if (!(res && res.ok)) {
        return Response.json (
            {
                statusText: "Error"
            },
            {
                status: res.status
            }
        )
    }

    return Response.json (
        JSON.stringify({
            statusText:"Success",
            status:200,
        }),{
            status:200,
            headers: { 
                'Set-Cookie': `accessToken=${token}; HttpOnly=true; Max-Age=${60*60*24}; Path=/; Secure`
        }
        }
    )
    

}
