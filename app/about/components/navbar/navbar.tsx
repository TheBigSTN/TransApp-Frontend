"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import * as React from "react"
import { ReactNode, } from "react"
import style from "./navbar.module.css"
import { ChevronDown, LayoutDashboard, LogOut, UserRound, UserRoundCog, UserRoundPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useSWR from "swr"
import { isLogedIn } from "@/models/User"

export default function Navbar({ className }: { className?: string }) {
    const { data: session } = useSWR("session", isLogedIn);

    return (
        <nav className={cn(style.navbar, className)}>
            {/* Stanga */}
            <div className={style.left} />
            {/* Centrat */}
            <ul className={style.centered}>
                <Link className={cn(style["navbar-text"], "!text-xl hover:bg-accent")} style={{ margin: "5px" }} href="/about">
                    About Us
                </Link>
                {/* <Link className={cn(style["navbar-text"], "text-xl hover:bg-accent")} style={{ margin: "5px" }} href="/dashboard/calendar">
                    Calendar
                </Link> */}
                {session &&
                    <Link href="/dashboard" className={cn(style["navbar-text"], "text-xl hover:bg-accent")} style={{ margin: "5px" }} >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                }
            </ul>
            {/* La dreapta */}
            <div className={cn(style.right, "w-min")}>
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={cn(style["navbar-text"], "text-xl hover:bg-accent group")}>
                            <UserRound /> Cont <ChevronDown
                                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                                aria-hidden="true"
                            />
                        </DropdownMenuTrigger >
                        <DropdownMenuContent className="max-h-[80vh] overflow-auto whitespace-normal">
                            <ul style={{ width: '200px', alignItems: 'center' }}>
                                <ListItem
                                    href={"/account"}> <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <UserRoundCog />
                                        Detalii </span>
                                </ListItem>
                                <ListItem
                                    href={"/account/addnew"}> <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <UserRoundPlus />
                                        Adauga Utilizatori </span>
                                </ListItem>
                                <ListItem
                                    href={`/account/signout`}> <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <LogOut />
                                        Sign out </span>
                                </ListItem>
                            </ul>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/account/signin" className={cn(style['navbar-text'], "!text-xl hover:bg-accent")} style={{ margin: "5px" }} >
                        <LayoutDashboard className="w-4 h-4" /> Sign in
                    </Link>
                )}
            </div>
        </nav>
    )
}

export { CardItem, ListItem }

type CardItemProps = {
    href: string;
    title: string;
    children: ReactNode;
};

function CardItem({ href, title, children }: CardItemProps) {
    return (
        <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px]">
            <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md hover:bg-accent hover:text-accent-foreground-dark focus:bg-accent focus:text-accent-foreground-gray transition-colors duration-200"
                href={href}
            >
                <div className="mb-2 mt-4 text-lg font-medium">{title}</div>
                <p className="text-sm leading-tight text-muted-foreground whitespace-normal break-words">
                    {children}
                </p>
            </Link>
        </ul>
    );
}
type ListItemProps = React.ComponentPropsWithoutRef<"a"> & { href: string; title?: React.ReactNode }

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    ListItemProps
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <Link
                href={href}
                ref={ref}
                className={cn(
                    "block bg-transparent select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </Link>
        </li>
    )
})
ListItem.displayName = "ListItem"
