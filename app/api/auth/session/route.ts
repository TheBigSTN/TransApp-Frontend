import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const hasToken = cookies().has('accessToken')
        return NextResponse.json({ loggedIn: hasToken })
    } catch (err) {
        return NextResponse.json({ loggedIn: false })
    }
}
