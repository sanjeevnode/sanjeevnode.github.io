'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Magnetic hover: the child is gently attracted to the cursor.
export default function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el || window.matchMedia('(pointer: coarse)').matches) return
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            xTo((e.clientX - (r.left + r.width / 2)) * strength)
            yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        return () => {
            el.removeEventListener('mousemove', onMove)
            el.removeEventListener('mouseleave', onLeave)
        }
    }, [strength])

    return <div ref={ref} className="inline-block">{children}</div>
}
