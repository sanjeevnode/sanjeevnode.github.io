'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// A route change mounts the next page before unmounting the old one, so guard
// against two Lenis instances both driving the ticker and fighting over scroll.
let active = false

// Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync
export default function SmoothScroll() {
    useEffect(() => {
        if (active) return
        active = true
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (process.env.NODE_ENV === 'development') (window as any).ST = ScrollTrigger
        const lenis = new Lenis({ lerp: 0.12 })
        lenis.on('scroll', ScrollTrigger.update)
        const raf = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)
        return () => {
            active = false
            gsap.ticker.remove(raf)
            lenis.destroy()
        }
    }, [])
    return null
}
