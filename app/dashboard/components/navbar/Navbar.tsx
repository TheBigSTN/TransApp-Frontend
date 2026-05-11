"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown, LogOut, UserRound, UserRoundCog, UserRoundPlus } from "lucide-react"
import * as React from "react"
import { ReactNode, } from "react"
import "./navbar.css"

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn("navbar glass-blur border-b border-white/10 bg-white/5 backdrop-blur-md", className)}>
      {/* Stanga */}
      <div className="left" />
      {/* Centrat */}
      <ul className="centered">
        <a className={"navbar-text text-xl text-blue-100 hover:bg-white/10 hover:text-white rounded-md px-3 py-2 transition-all"} style={{ margin: "5px" }} href="/dashboard">
          About Us
        </a>
        <a className={"navbar-text text-xl text-blue-100 hover:bg-white/10 hover:text-white rounded-md px-3 py-2 transition-all"} style={{ margin: "5px" }} href="/dashboard/calendar">
          Calendar
        </a>
        <a className={"navbar-text text-xl text-blue-100 hover:bg-white/10 hover:text-white rounded-md px-3 py-2 transition-all"} style={{ margin: "5px" }} href="/dashboard/anexe">
          Facturare
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={"navbar-text text-xl text-blue-100 hover:bg-white/10 hover:text-white rounded-md px-3 py-2 transition-all group"}
            style={{
              margin: "5px"
            }}
          > Componente
            <ChevronDown
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[80vh] overflow-auto glass-card border-white/20 bg-black/60 backdrop-blur-xl">
            <ul className="grid gap-1 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <a
                  className="flex text-lg h-full w-full select-none flex-col justify-end rounded-md bg-white/5 border border-white/10 p-4 no-underline outline-none focus:shadow-md hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white transition-colors duration-200"
                  href="/dashboard/masini"
                >
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Mașini
                  </div>
                  <p className="text-sm leading-tight text-blue-100">
                    Adaugă, editează sau șterge mașinile aflate în gestiunea platformei
                  </p>
                </a>
              </li>
              <ListItem href="/dashboard/alimentari" title="Alimentări">
                Alimentările cu carburant ale mașinilor.
              </ListItem>
              <ListItem href="/dashboard/licente" title="Licențe">
                Licențele curente și expirate ale mașinilor.
              </ListItem>
            </ul>
            <CardItem title="Șoferi" href="/dashboard/soferi">
              Adaugă, editează sau șterge șoferii aflați în gestiunea platformei
            </CardItem>
            <CardItem title="Clienți" href="/dashboard/clienti">
              Adaugă, editează sau șterge clienții aflați în gestiunea platformei
            </CardItem>
            <CardItem title="Curse" href="/dashboard/curse">
              Adaugă, editează sau șterge cursele aflate în gestiunea platformei
            </CardItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
      {/* La dreapta */}
      <div className="right">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={"navbar-text text-xl text-blue-100 hover:bg-white/10 hover:text-white rounded-md px-3 py-2 transition-all group"}>
            <UserRound /> Cont <ChevronDown
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </DropdownMenuTrigger >
          <DropdownMenuContent className="max-h-[80vh] overflow-auto whitespace-normal glass-card border-white/20 bg-black/60 backdrop-blur-xl">
            <ul style={{ width: '200px', alignItems: 'center' }}>
              <ListItem
                href={"/account"}> <span style={{ display: 'flex', alignItems: 'center' }}>
                  <UserRoundCog className="mr-2 h-4 w-4" />
                  Detalii </span>
              </ListItem>
              <ListItem
                href={"/account/addnew"}> <span style={{ display: 'flex', alignItems: 'center' }}>
                  <UserRoundPlus className="mr-2 h-4 w-4" />
                  Adauga Utilizatori </span>
              </ListItem>
              <ListItem
                href={`/account/signout`}> <span style={{ display: 'flex', alignItems: 'center', color: '#ef4444' }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out </span>
              </ListItem>
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
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
      <a
        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-white/5 border border-white/10 p-3 no-underline outline-none focus:shadow-md hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white transition-colors duration-200"
        href={href}
      >
        <div className="mb-2 mt-4 text-lg font-medium text-white">{title}</div>
        <p className="text-sm leading-tight text-blue-100 whitespace-normal break-words">
          {children}
        </p>
      </a>
    </ul>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none text-white">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-blue-100">
          {children}
        </p>
      </a>
    </li>
  )
})
ListItem.displayName = "ListItem"
