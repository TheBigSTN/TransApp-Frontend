import { AccountNav } from './components/navbar/navbar'

export const metadata = {
    title: 'Account',
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="glass-bg min-h-screen flex-1">
            <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            <header className="relative z-20">
                <AccountNav />
            </header>
            <main className="mx-auto relative z-10">
                {children}
            </main>
        </div>
    )
}
