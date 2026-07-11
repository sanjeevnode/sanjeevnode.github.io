'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Rolling 0→100 counter, then the curtain lifts to reveal the page.
// Shown once per session so navigation back doesn't replay it.
export default function Preloader() {
    const [done, setDone] = useState(true)
    const rootRef = useRef<HTMLDivElement>(null)
    const numRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (sessionStorage.getItem('preloaded')) return
        setDone(false)
        document.documentElement.classList.add('overflow-hidden')

        const counter = { v: 0 }
        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem('preloaded', '1')
                document.documentElement.classList.remove('overflow-hidden')
                setDone(true)
            },
        })
        tl.to(counter, {
            v: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (numRef.current) numRef.current.textContent = String(Math.round(counter.v))
            },
        })
            .to(numRef.current, { yPercent: -120, opacity: 0, duration: 0.4, ease: 'power2.in' })
            .to(rootRef.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.1')

        return () => { tl.kill() }
    }, [])

    if (done) return null

    return (
        <div ref={rootRef} className="fixed inset-0 z-[100] bg-pf-bg flex items-end justify-between px-8 pb-8">
            <span className="font-mono text-sm text-pf-dim">sanjeevnode.in</span>
            <span ref={numRef} className="font-display font-light text-[18vw] leading-none text-pf-text tabular-nums">0</span>
        </div>
    )
}
