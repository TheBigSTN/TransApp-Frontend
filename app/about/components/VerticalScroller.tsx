"use client"

import React, { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { CalendarDays, Users, Truck, Fuel, FileCheck, CreditCard } from 'lucide-react'

type Feature = {
    icon: React.ComponentType<any>
    title: string
    description: string
}

// const FEATURES: Feature[] = [
//     { icon: CalendarDays, title: 'Calendar Management', description: 'Interactive calendar with integrated scheduling for trips, licenses, and fuel management.' },
//     { icon: Users, title: 'Driver Management', description: 'Complete driver profiles, license tracking, and assignment system.' },
//     { icon: Truck, title: 'Vehicle Fleet', description: 'Comprehensive vehicle management with maintenance tracking and license monitoring.' },
//     { icon: Fuel, title: 'Fuel Tracking', description: 'Detailed fuel consumption monitoring and cost analysis.' },
//     { icon: FileCheck, title: 'License Management', description: 'Automated license tracking and renewal notifications for vehicles and drivers.' },
//     { icon: CreditCard, title: 'Billing & Invoicing', description: 'Streamlined billing process with automated invoice generation.' },
// ]

const FEATURES: Feature[] = [
    { icon: CalendarDays, title: 'Management calendar', description: 'Calendar interactiv cu programare integrată pentru curse, licențe și gestionarea combustibilului.' },
    { icon: Users, title: 'Gestionarea șoferilor', description: 'Profiluri complete ale șoferilor, urmărirea licențelor și sistem de alocare.' },
    { icon: Truck, title: 'Flotă de vehicule', description: 'Gestionarea completă a vehiculelor cu monitorizare a întreținerii și a licențelor.' },
    { icon: Fuel, title: 'Urmărirea combustibilului', description: 'Monitorizare detaliată a consumului de combustibil și analiză a costurilor.' },
    { icon: FileCheck, title: 'Gestionarea licențelor', description: 'Urmărirea automată a licențelor și notificări de reînnoire pentru vehicule și șoferi.' },
    { icon: CreditCard, title: 'Facturare & Invoicing', description: 'Proces de facturare simplificat cu generare automată de facturi.' },
]

export default function VerticalScroller({ visible = 3, interval = 3000 }: { visible?: number, interval?: number }) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const itemRef = useRef<HTMLDivElement | null>(null)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // compute item height + gap so we can compute offsets reliably and set container height
        const firstItem = itemRef.current
        const gap = 16 // matches layout spacing (space-y-4)
        const itemHeight = firstItem ? firstItem.getBoundingClientRect().height : 0
        if (itemHeight) {
            container.style.maxHeight = `${visible * itemHeight + (visible - 1) * gap}px`
        }

        let idx = 0
        const total = FEATURES.length

        // rAF smooth scroll implementation
        let rafId: number | null = null
        const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

        // onComplete is called once the animation finishes (after final frame)
        const smoothScrollTo = (targetTop: number, duration = 600, onComplete?: () => void) => {
            if (!container) return
            if (duration === 0) {
                container.scrollTop = targetTop
                if (onComplete) onComplete()
                return
            }

            const start = container.scrollTop
            const change = targetTop - start
            const startTime = performance.now()

            const animate = (now: number) => {
                const elapsed = now - startTime
                const t = Math.min(1, elapsed / duration)
                const eased = easeInOutQuad(t)
                container.scrollTop = start + change * eased
                if (t < 1) {
                    rafId = requestAnimationFrame(animate)
                } else {
                    // ensure final position and call onComplete
                    container.scrollTop = targetTop
                    if (onComplete) onComplete()
                }
            }

            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(animate)
        }

        // total height of one copy of the list (used for seamless jump)
        const oneCopyHeight = itemHeight ? total * (itemHeight + gap) : 0

        const tick = () => {
            if (paused) return
            idx = idx + 1

            // compute target top relative to container
            let targetTop = 0
            if (itemHeight) {
                targetTop = idx * (itemHeight + gap)
            } else {
                const target = container.children[idx] as HTMLElement
                if (target) targetTop = target.offsetTop
            }

            const duration = 600
            if (idx >= total && oneCopyHeight) {
                // animate into the duplicated region, then reset instantly when animation completes
                smoothScrollTo(targetTop, duration, () => {
                    if (container) container.scrollTop = container.scrollTop - oneCopyHeight
                    idx = idx - total
                })
            } else {
                smoothScrollTo(targetTop, duration)
            }
        }

        const id = setInterval(tick, interval)
        return () => {
            clearInterval(id)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [visible, interval, paused])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const preventScroll = (e: Event) => {
            e.preventDefault()
        }

        container.addEventListener("wheel", preventScroll, { passive: false })
        container.addEventListener("touchmove", preventScroll, { passive: false })

        return () => {
            container.removeEventListener("wheel", preventScroll)
            container.removeEventListener("touchmove", preventScroll)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={`flex flex-col overflow-y-auto space-y-4 no-scrollbar`}
            // onMouseEnter={() => setPaused(true)}
            // onMouseLeave={() => setPaused(false)}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
        >
            {[...FEATURES, ...FEATURES].map((f, i) => {
                const Icon = f.icon
                // ref only on the very first real item
                return (
                    <div key={`feature-${i}`} ref={i === 0 ? itemRef : null} className="snap-start">
                        <Card className="p-4 bg-white/10 border-white/5 hover:scale-105 transform transition shadow-lg w-full h-28">
                            <div className="flex items-center gap-3 h-full">
                                <div className="feature-icon bg-white/20 p-2">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white drop-shadow-sm">{f.title}</h4>
                                    <p className="text-sm text-white/80 drop-shadow-sm">{f.description}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}
