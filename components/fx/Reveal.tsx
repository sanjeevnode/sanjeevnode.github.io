'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Fade-up scroll reveal driven by IntersectionObserver (robust with
// streamed/suspended content). Direct children are staggered.
export default function Reveal({
    children,
    className,
    stagger = 0.08,
    y = 40,
}: {
    children: React.ReactNode
    className?: string
    stagger?: number
    y?: number
}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        gsap.set(el.children, { y, opacity: 0 })
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    gsap.to(el.children, {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        stagger,
                    })
                    io.disconnect()
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [stagger, y])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}
