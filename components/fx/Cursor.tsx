'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Custom cursor: accent dot + trailing ring. Ring grows over links/buttons.
// Fine-pointer devices only; native cursor is hidden via the pf-cursor class.
export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        document.documentElement.classList.add('pf-cursor')
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

        const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

        const onMove = (e: MouseEvent) => {
            gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: 'auto' })
            dotX(e.clientX); dotY(e.clientY)
            ringX(e.clientX); ringY(e.clientY)
        }
        const onOver = (e: MouseEvent) => {
            const interactive = (e.target as Element).closest?.('a, button, [role="button"], input, textarea, label')
            gsap.to(ring, { scale: interactive ? 2 : 1, duration: 0.3, ease: 'power3.out' })
            gsap.to(dot, { scale: interactive ? 0.5 : 1, duration: 0.3 })
        }
        const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 })

        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mouseover', onOver, { passive: true })
        document.documentElement.addEventListener('mouseleave', onLeave)
        return () => {
            document.documentElement.classList.remove('pf-cursor')
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
            document.documentElement.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    // hidden by default; only displayed at all on fine-pointer devices
    return (
        <>
            <div ref={dotRef} className="hidden [@media(pointer:fine)]:block opacity-0 fixed top-0 left-0 z-[90] w-2 h-2 rounded-full bg-pf-accent pointer-events-none" />
            <div ref={ringRef} className="hidden [@media(pointer:fine)]:block opacity-0 fixed top-0 left-0 z-[90] w-9 h-9 rounded-full border border-pf-accent/50 pointer-events-none" />
        </>
    )
}
