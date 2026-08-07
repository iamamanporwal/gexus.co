'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

/**
 * The neural-network particle field: a grid of grey dots displaced by layered
 * sine waves, with short connective threads between near neighbours. Canvas 2D
 * keeps it cheap enough to hold 60fps without a WebGL context.
 */
export function ParticleWave({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = true

    // Dot density scales with width so the field stays airy on phones instead
    // of collapsing into a solid band.
    let COLS = 116
    const ROWS = 16

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      COLS = Math.max(44, Math.min(120, Math.round(width / 9)))
    }

    const draw = (time: number) => {
      const t = reduced ? 0 : time * 0.00016
      ctx.clearRect(0, 0, width, height)

      const stepX = width / (COLS - 1)
      const spread = height * 0.22 // vertical separation of the sheet's strands
      const amp = height * 0.34

      // Cache one row of points at a time so we can thread neighbours cheaply.
      let prevRow: { x: number; y: number; a: number; s: number }[] = []

      for (let r = 0; r < ROWS; r++) {
        const row: { x: number; y: number; a: number; s: number }[] = []
        const rn = r / (ROWS - 1)
        // Strands further "back" sit higher, sit closer together and fade out.
        const depth = 1 - rn
        const rowY = height * 0.52 + (rn - 0.5) * spread

        for (let c = 0; c < COLS; c++) {
          const cn = c / (COLS - 1)
          const x = c * stepX

          // Roughly one and a half slow cycles across the width, so the field
          // reads as one sweeping wave rather than ripples.
          const wave =
            Math.sin(cn * 8.2 + t * 1.7 + rn * 0.8) * 0.62 +
            Math.sin(cn * 3.4 - t * 1.1 + rn * 1.6) * 0.34 +
            Math.sin(cn * 14.5 + t * 0.7 - rn * 0.6) * 0.08

          const y = rowY + wave * amp * (0.7 + depth * 0.3)

          // Fade toward both edges so the field dissolves into the whitespace.
          const edge = Math.sin(Math.PI * cn) ** 1.15
          const a = edge * (0.3 + depth * 0.7) * 0.8
          const s = 0.55 + depth * 1.05

          row.push({ x, y, a, s })
        }

        const linkLimit = spread * 0.9

        for (let c = 0; c < COLS; c++) {
          const p = row[c]
          if (p.a <= 0.02) continue

          // Threads to the previous strand read as the network structure.
          const q = prevRow[c]
          if (q && c % 2 === 0) {
            const d = Math.abs(p.y - q.y)
            if (d < linkLimit) {
              ctx.strokeStyle = `rgba(17,17,17,${p.a * 0.1 * (1 - d / linkLimit)})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(q.x, q.y)
              ctx.lineTo(p.x, p.y)
              ctx.stroke()
            }
          }

          ctx.fillStyle = `rgba(17,17,17,${Math.min(0.8, p.a)})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
          ctx.fill()
        }

        prevRow = row
      }
    }

    const loop = (time: number) => {
      if (!running) return
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    resize()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas)

    // Pause when scrolled out of view — no reason to burn frames off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return
        if (entry.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(loop)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn('h-full w-full', className)}
    />
  )
}
