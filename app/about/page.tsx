// Converted to single long page (no tabs)
// Tabs removed - sections rendered sequentially
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import pkg from '../../package.json'
import { CalendarDays, Users, Truck, Fuel, FileCheck, CreditCard, ArrowRight, FileText, LayoutDashboard } from 'lucide-react'
import VerticalScroller from './components/VerticalScroller'

const features = [
  {
    icon: CalendarDays,
    title: "Calendar Management",
    description: "Interactive calendar with integrated scheduling for trips, licenses, and fuel management."
  },
  {
    icon: Users,
    title: "Driver Management",
    description: "Complete driver profiles, license tracking, and assignment system."
  },
  {
    icon: Truck,
    title: "Vehicle Fleet",
    description: "Comprehensive vehicle management with maintenance tracking and license monitoring."
  },
  {
    icon: Fuel,
    title: "Fuel Tracking",
    description: "Detailed fuel consumption monitoring and cost analysis."
  },
  {
    icon: FileCheck,
    title: "License Management",
    description: "Automated license tracking and renewal notifications for vehicles and drivers."
  },
  {
    icon: CreditCard,
    title: "Billing & Invoicing",
    description: "Streamlined billing process with automated invoice generation."
  }
]

const techStack = {
  frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
  auth: ["NextAuth.js", "JWT"],
  dataManagement: ["React Query", "SWR", "Zod", "React Hook Form"],
  ui: ["Radix UI", "Chakra UI", "Lucide Icons"],
  tools: ["ESLint", "TypeScript", "PostCSS"]
}

export default function AboutPage() {
  return (
    <div className={`space-y-12 min-h-screen px-16 md:px-8 py-4 w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden`}>
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero / Overview */}
      <section id="overview">
        <section className="relative overflow-hidden rounded-lg">
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 p-8 text-white relative overflow-hidden">

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">{pkg.name.toUpperCase()}</h1>
                  <p className="mt-3 text-white/90 text-lg font-medium drop-shadow max-w-prose">
                    A comprehensive transportation management system built with modern web technologies.
                    Designed to streamline fleet operations, driver management, and business administration
                    for transportation companies. Below you will find a quick overview of features and the stack we use.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/account/addnew" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sky-700 font-semibold shadow hover:scale-105 transition-transform">
                      Create an account <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/account/signin" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-white font-semibold hover:bg-white/10 transition">
                      Sign in
                    </Link>
                  </div>
                </div>

                <div className="hidden md:block">
                  {/* VerticalScroller: shows 3 items and auto-scrolls; client component */}
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <div>
                    {/* client scroller component */}
                    <VerticalScroller visible={3} interval={3000} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Get Started */}
      <section id="get-started">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <div className="space-y-8 mt-4">
          <div className="prose dark:prose-invert max-w-none">
            <p>Follow these steps to get started with our transport management system:</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 glass-card" style={{ animationDelay: `0ms` }}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">New Users</h3>
                <p className="text-sm text-muted-foreground">Create an account to access all features of the transport management system.</p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/account/register">Create Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 glass-card" style={{ animationDelay: `120ms` }}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Existing Users</h3>
                <p className="text-sm text-muted-foreground">Already have an account? Sign in to access your dashboard.</p>
                <div className="flex gap-4">
                  <Button asChild variant="secondary">
                    <Link href="/account/signin">Sign In <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}