'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import heroLattice from '@/public/images/hero-lattice.webp'

/**
 * The hero part. This is a render of the generated lattice, shipped as an
 * image rather than a live WebGL scene: it removes roughly half a megabyte of
 * JavaScript from the critical path and lets the browser treat the artwork as
 * the LCP element it actually is.
 *
 * The only script here writes two CSS custom properties on pointer move. The
 * float, the tilt and the parallax are all CSS.
 */
export function HeroArt({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    let tx = 0
    let ty = 0

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        // Capped at two degrees, per the design spec.
        el.style.setProperty('--tilt-x', `${(-ty * 2).toFixed(2)}deg`)
        el.style.setProperty('--tilt-y', `${(tx * 2).toFixed(2)}deg`)
        el.style.setProperty('--drift-x', `${(tx * 10).toFixed(1)}px`)
        el.style.setProperty('--drift-y', `${(ty * 6).toFixed(1)}px`)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="absolute inset-0 [perspective:1200px]">
      <div
        ref={ref}
        className="h-full w-full transition-transform duration-[1200ms] ease-out [transform-style:preserve-3d]"
        style={{
          transform:
            'translate3d(var(--drift-x, 0px), var(--drift-y, 0px), 0) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        }}
      >
        <div className="float-slow h-full w-full">
          <Image
            src={heroLattice}
            alt={alt}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 46vw"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
