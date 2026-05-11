import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import * as React from 'react';
import { CardItem, ListItem } from './Navbar';
import { ChevronDown, LogOut, UserRound, UserRoundCog, UserRoundPlus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';


function AppSidebar({ className }: { className?: string }) {
    return (
        <Sidebar className={cn("glass-blur border-r border-white/10 bg-black/20 backdrop-blur-md", className)}>
            <SidebarHeader className='min-h-[60px] flex items-center justify-center border-b border-white/10'>
                <a href="/dashboard" className="text-xl font-bold text-white">Dashboard</a>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <a className="navbar-text text-lg text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4" href="/dashboard">
                            About Us
                        </a>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <a className="navbar-text text-lg text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4" href="/dashboard/calendar">
                            Calendar
                        </a>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <a className="navbar-text text-lg text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4" href="/dashboard/anexe">
                            Facturare
                        </a>
                    </SidebarMenuItem>
                    <Collapsible defaultOpen className="group">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild >
                                <SidebarMenuButton
                                    className="navbar-text text-lg text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start px-4 h-10 inline-flex items-center">
                                    Componente
                                    <ChevronDown className='transition duration-200 group-data-[state=open]:rotate-180 ml-auto' />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubButton
                                        className="navbar-text text-base text-blue-200 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4 h-10"
                                        href="/dashboard/masini"
                                        title='Adaugă, editează sau șterge mașinile aflate în gestiunea platformei'>
                                        Mașini
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton
                                        className="navbar-text text-base text-blue-200 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4 h-10"
                                        href="/dashboard/alimentari"
                                        title='Alimentările cu carburant ale mașinilor.'>
                                        Alimentări
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton
                                        className="navbar-text text-base text-blue-200 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4 h-10"
                                        href="/dashboard/licente"
                                        title='Licențele curente și expirate ale mașinilor.'>
                                        Licențe
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton
                                        className="navbar-text text-base text-blue-200 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4 h-10"
                                        href="/dashboard/soferi"
                                        title='Adaugă, editează sau șterge șoferii aflate în gestiunea platformei.'>
                                        Șoferi
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton
                                        className="navbar-text text-base text-blue-200 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4 h-10"
                                        href="/dashboard/clienti"
                                        title='Adaugă, editează sau șterge clienții aflați în gestiunea platformei'>
                                        Clienți
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton
                                        className="navbar-text text-base text-blue-200 hover:bg-white/10 hover:text-white rounded-md transition-all my-1 w-full justify-start items-start px-4 h-10"
                                        href="/dashboard/curse"
                                        title='Adaugă, editează sau șterge cursele aflate în gestiunea platformei'>
                                        Curse
                                    </SidebarMenuSubButton>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className='border-t border-white/10'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={"navbar-text text-lg text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all group w-full flex justify-start items-center px-4"}>
                                <UserRound className="mr-2 h-5 w-5" /> Cont <ChevronDown
                                    className="relative top-[1px] ml-auto h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
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
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;