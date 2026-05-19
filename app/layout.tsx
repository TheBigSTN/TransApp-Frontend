import "./globals.css"
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth Tutorial',
  description: 'Learn NextAuth.js by Dave Gray',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={`${inter.className}`}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
