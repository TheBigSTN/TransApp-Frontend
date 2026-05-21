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
                  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">Trans App</h1>
                  <p className="mt-3 text-white/90 text-lg font-medium drop-shadow max-w-prose">
                    Un sistem complet de management al transportului construit cu tehnologii web moderne.
                    Proiectat pentru a eficientiza operațiunile flotei, gestionarea șoferilor și administrarea afacerii
                    pentru companiile de transport. Mai jos vei găsi o prezentare rapidă a funcționalităților și a tehnologiilor folosite.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/account/register" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sky-700 font-semibold shadow hover:scale-105 transition-transform">
                      Creează un cont <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/account/signin" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-white font-semibold hover:bg-white/10 transition">
                      Autentificare
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
        <h2 className="text-2xl glass-text">Începe</h2>
        <div className="space-y-8 mt-4">
          <div className="prose dark:prose-invert max-w-none ">
            <p>Urmează acești pași pentru a începe utilizarea sistemului nostru de management al transportului:</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 glass" style={{ animationDelay: `0ms` }}>
              <div className="space-y-4">
                <h3 className="glass-text text-lg">Utilizatori noi</h3>
                <p className="text-sm text-muted-foreground">Creează un cont pentru a accesa toate funcționalitățile sistemului de management al transportului.</p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/account/register">Creează cont <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 glass" style={{ animationDelay: `120ms` }}>
              <div className="space-y-4">
                <h3 className="glass-text text-lg">Utilizatori existenți</h3>
                <p className="text-sm text-muted-foreground">Ai deja un cont? Autentifică-te pentru a accesa panoul de control.</p>
                <div className="flex gap-4">
                  <Button asChild variant="secondary">
                    <Link href="/account/signin">Autentificare<ArrowRight className="ml-2 h-4 w-4" /></Link>
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