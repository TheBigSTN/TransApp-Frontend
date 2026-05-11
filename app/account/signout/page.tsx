"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { RemoveCookie } from './server';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';

function DashboardSignOut() {
    const [isopen, setisopen] = useState(false)
    const [dialogtext, setdialogtext] = useState("")
    const router = useRouter()

    function logout() {
        localStorage.removeItem("role");
        RemoveCookie();
        setdialogtext("Te-ai deconectat cu succes");
        setisopen(true);
    }

    return (
        <div className="glass-bg min-h-screen flex items-center justify-center py-12">
            <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            <div className="mx-auto grid gap-6 glass-card p-8 relative z-10">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold text-white">Deconectează-te</h1>
                    <p className="text-balance text-blue-100">
                        Deconectează-te din contul tau
                    </p>
                </div>
                <Button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg">
                    Deconectează-te
                </Button>
                <Dialog open={isopen} >
                    <DialogContent className="glass-card border-white/20 bg-white/10 backdrop-blur-md">
                        <DialogDescription className="text-white text-center font-semibold">
                            {dialogtext}
                        </DialogDescription>
                        <DialogFooter>
                            <Button
                                onClick={() => router.push("/")}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Continua
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
export default DashboardSignOut;
