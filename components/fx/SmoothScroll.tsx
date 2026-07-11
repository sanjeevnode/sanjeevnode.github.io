'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync
export default function SmoothScroll() {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (process.env.NODE_ENV === 'development') (window as any).ST = ScrollTrigger
        const lenis = new Lenis({ lerp: 0.12 })
        lenis.on('scroll', ScrollTrigger.update)
        const raf = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)
        return () => {
            gsap.ticker.remove(raf)
            lenis.destroy()
        }
    }, [])
    return null
}
