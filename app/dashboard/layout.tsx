import AppSidebar from "./components/navbar/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";
import Navbar from "./components/navbar/Navbar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (<>
        <AppSidebar />
        <div className="glass-bg flex flex-col flex-1 w-full h-full">
            <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            <header className='sticky top-0 z-50'>
                <div className='navbar md:!hidden  wz-full sticky top-0 z-50'>
                    <div className='px-4'>
                        {/* Sidebar is still work in progress */}
                        {/* <SidebarTrigger className='flex justify-center' /> */}
                    </div>
                </div>
                <Navbar className='!hidden md:!flex' />
            </header>
            <main className="flex justify-center h-full max-h-full">
                <Suspense>
                    {children}
                </Suspense>
            </main>
        </div>
    </>
    )
}