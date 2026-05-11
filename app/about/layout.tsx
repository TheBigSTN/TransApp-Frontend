import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Suspense } from "react"
import Navbar from "./components/navbar/navbar"

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background flex-1 relative">
            {/* Navbar always on top */}
            <Navbar />
            {/* Animated blurred blobs under content */}
            <main className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
                    {/* Animated gradient blobs in background */}
                    <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                    </div>
                    <Suspense>
                        {children}
                    </Suspense>
                </div>
            </main>
        </div>
    )
}