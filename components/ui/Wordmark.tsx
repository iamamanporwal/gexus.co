import { cn } from '@/lib/utils'
import {
  CAP_HEIGHT,
  GLYPH_WIDTH,
  TRACKING,
  WORDMARK_GLYPHS,
  roundedPath,
} from '@/lib/letterforms'

/**
 * The GEXUS wordmark, set in the custom letterforms from lib/letterforms.
 *
 * The finish is built in layers: a shallow extrusion behind the face, a
 * titanium gradient on the face itself, a specular sweep across the upper
 * third, and a two tone bevel that lights the top edges and shades the bottom
 * ones.
 */

const ADVANCE = GLYPH_WIDTH + TRACKING
const MARK_W = WORDMARK_GLYPHS.length * GLYPH_WIDTH + (WORDMARK_GLYPHS.length - 1) * TRACKING
const DEPTH = 4 // extrusion depth, kept minimal
const VIEW_H = CAP_HEIGHT + DEPTH

const PATHS = WORDMARK_GLYPHS.map((g, i) => ({ d: roundedPath(g), x: i * ADVANCE }))

type Tone = 'dark' | 'light'

const FINISH: Record<
  Tone,
  {
    face: [string, string, string, string, string]
    extrude: [string, string]
    bevelTop: string
    bevelBottom: string
    glossOpacity: number
  }
> = {
  // Glossy black titanium: near black with a cool grey lift where the light
  // catches, never light enough to lose the "black" reading.
  dark: {
    face: ['#3b3d44', '#141519', '#2c2e35', '#0b0b0e', '#232529'],
    extrude: ['#17181c', '#050506'],
    bevelTop: 'rgba(255,255,255,0.42)',
    bevelBottom: 'rgba(0,0,0,0.55)',
    glossOpacity: 0.2,
  },
  // The same metal read on a dark surface, where black on black would vanish.
  light: {
    face: ['#ffffff', '#c6c8cf', '#8e9099', '#eeeff2', '#a4a6ae'],
    extrude: ['#54565e', '#25262b'],
    bevelTop: 'rgba(255,255,255,0.9)',
    bevelBottom: 'rgba(0,0,0,0.4)',
    glossOpacity: 0.5,
  },
}

export function Wordmark({ className, tone = 'dark' }: { className?: string; tone?: Tone }) {
  const f = FINISH[tone]
  const id = `wm-${tone}`

  // Referenced everywhere else so the path data appears in the document a
  // single time rather than once per finish layer.
  const use = <use href={`#${id}-glyphs`} />

  return (
    <svg
      viewBox={`0 0 ${MARK_W} ${VIEW_H}`}
      className={cn('block h-[15px] w-auto lg:h-[16px]', className)}
      role="img"
      aria-label="Gexus"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <g id={`${id}-glyphs`}>
          {PATHS.map((p, i) => (
            <path key={i} d={p.d} transform={`translate(${p.x} 0)`} />
          ))}
        </g>

        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={f.face[0]} />
          <stop offset="26%" stopColor={f.face[1]} />
          <stop offset="52%" stopColor={f.face[2]} />
          <stop offset="74%" stopColor={f.face[3]} />
          <stop offset="100%" stopColor={f.face[4]} />
        </linearGradient>

        <linearGradient id={`${id}-extrude`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={f.extrude[0]} />
          <stop offset="100%" stopColor={f.extrude[1]} />
        </linearGradient>

        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0.18" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={f.glossOpacity} />
          <stop offset="42%" stopColor="#ffffff" stopOpacity={f.glossOpacity * 0.35} />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <clipPath id={`${id}-clip`}>{use}</clipPath>
      </defs>

      <g fill={`url(#${id}-extrude)`}>
        {Array.from({ length: DEPTH }, (_, i) => (
          <g key={i} transform={`translate(0 ${DEPTH - i})`} opacity={0.55 + i * 0.09}>
            {use}
          </g>
        ))}
      </g>

      <g fill={`url(#${id}-face)`}>{use}</g>

      {/* Soft bevel. The outline is stroked twice inside its own clip, once
          nudged down so the lit edge shows along the top, once nudged up so the
          shaded edge shows along the bottom. */}
      <g clipPath={`url(#${id}-clip)`} fill="none" strokeWidth="1.5">
        <g transform="translate(0 1.1)" stroke={f.bevelTop}>
          {use}
        </g>
        <g transform="translate(0 -1.2)" stroke={f.bevelBottom}>
          {use}
        </g>
      </g>

      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width={MARK_W} height={CAP_HEIGHT} fill={`url(#${id}-gloss)`} />
      </g>
    </svg>
  )
}
