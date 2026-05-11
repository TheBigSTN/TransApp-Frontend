"use client"

import "app/dashboard/components/navbar/navbar.css"
import Link from "next/link"
import { UserPlus, LogIn, LayoutDashboard } from "lucide-react"
import useSWR from "swr";
import { isLogedIn } from "@/models/User";

export function AccountNav() {
    const { data: session } = useSWR("session", isLogedIn);

    return (
        <nav className="navbar">
            <div className="left" />

            <div className="centered flex items-center space-x-4">
                <Link href="/about" className="navbar-text">About</Link>
                <Link href="/account" className="navbar-text">Account</Link>
                {session && <Link href="/account/signout" className="navbar-text">Sign out</Link>}
            </div>

            <div className="right w-min">
                {session ? (
                    <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-sm text-white">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href="/account/signin" className="inline-flex items-center gap-2 text-sm hover:underline mr-2 text-nowrap">
                            <LogIn className="w-4 h-4" /> Sign in
                        </Link>
                        <Link href="/account/register" className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                            <UserPlus className="w-4 h-4" /> Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
