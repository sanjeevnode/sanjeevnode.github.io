'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Per-character rise + untilt reveal for headings.
export default function TitleReveal({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const chars = el.querySelectorAll('.tr-char')
        gsap.set(chars, { yPercent: 110, rotateX: -70, opacity: 0 })
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                gsap.to(chars, {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.025,
                })
                io.disconnect()
            }
        }, { threshold: 0.3 })
        io.observe(el)
        return () => io.disconnect()
    }, [text])

    return (
        <span ref={ref} className={className} aria-label={text} style={{ perspective: '600px' }}>
            {text.split('').map((ch, i) => (
                <span key={i} aria-hidden className="tr-char inline-block will-change-transform">
                    {ch === ' ' ? ' ' : ch}
                </span>
            ))}
        </span>
    )
}
