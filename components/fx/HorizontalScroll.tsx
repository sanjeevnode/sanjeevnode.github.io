'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Pins the section and converts vertical scroll into horizontal movement
// of the slide track. Desktop only - below lg the slides stack vertically.
// direction 'rtl': slides travel right -> left (default).
// direction 'ltr': slides travel left -> right.
export default function HorizontalScroll({
    header,
    children,
    className,
    direction = 'rtl',
}: {
    header?: React.ReactNode
    children: React.ReactNode
    className?: string
    direction?: 'rtl' | 'ltr'
}) {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        const mm = gsap.matchMedia()
        mm.add('(min-width: 1024px)', () => {
            const getDistance = () => track.scrollWidth - window.innerWidth
            // rtl: track moves left (slides enter from the right)
            // ltr: track is direction:rtl so slide 1 starts visible; moving
            //      the track right brings the next slides in from the left
            gsap.fromTo(track, { x: 0 }, {
                x: direction === 'ltr' ? () => getDistance() : () => -getDistance(),
                ease: 'none',
                immediateRender: true,
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${getDistance()}`,
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
            // positions depend on streamed-in content; recalc once mounted
            requestAnimationFrame(() => ScrollTrigger.refresh())
        })
        return () => mm.revert()
    }, [direction])

    // ltr uses CSS direction:rtl on the track (desktop only) so the first
    // slide starts visible and later slides sit to its left; each slide's
    // content is reset back to ltr. flex-row-reverse would break scrollWidth.
    const slides = direction === 'ltr'
        ? React.Children.map(children, (child) => (
            <div dir="ltr" className="contents">{child}</div>
        ))
        : children

    return (
        <section ref={sectionRef} className={`relative lg:h-screen lg:overflow-hidden lg:flex lg:flex-col ${className ?? ''}`}>
            {header && <div className="relative z-10 shrink-0">{header}</div>}
            <div
                ref={trackRef}
                className={`lg:flex lg:flex-1 lg:min-h-0 will-change-transform ${direction === 'ltr' ? 'lg:[direction:rtl]' : ''}`}
            >
                {slides}
            </div>
        </section>
    )
}
