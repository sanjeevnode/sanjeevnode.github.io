'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A decorative line that "draws" itself (scales in) when scrolled into view.
export default function DrawLine({
    className,
    axis = 'x',
    delay = 0,
}: {
    className?: string
    axis?: 'x' | 'y'
    delay?: number
}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const prop = axis === 'x' ? 'scaleX' : 'scaleY'
        gsap.set(el, { [prop]: 0, transformOrigin: axis === 'x' ? 'left center' : 'center top' })
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                gsap.to(el, { [prop]: 1, duration: 1.4, ease: 'power3.inOut', delay })
                io.disconnect()
            }
        }, { threshold: 0.1 })
        io.observe(el)
        return () => io.disconnect()
    }, [axis, delay])

    return <div ref={ref} className={className} aria-hidden />
}
