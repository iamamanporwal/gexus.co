import { G_PATH, CAP_HEIGHT, GLYPH_WIDTH } from '@/lib/letterforms'
import { cn } from '@/lib/utils'

/**
 * The Gexus emblem: the wordmark's own G, extruded in polished chrome and
 * standing on a turned metal plinth.
 *
 * The glyph is the exact letterform from lib/letterforms rather than a
 * separately drawn mark, so the emblem and the wordmark stay in one family.
 *
 * The metal is animated. Two specular bands sweep across the face at
 * different rates and angles, a slow anisotropic shimmer drifts underneath
 * them, and a highlight travels around the plinth. All of it is CSS keyframes
 * on transforms and opacity, so it composites on the GPU and ships no
 * JavaScript. Everything stops under prefers-reduced-motion.
 */

const SCALE = 1.94
const GW = GLYPH_WIDTH * SCALE // 229
const GH = CAP_HEIGHT * SCALE // 194
const GX = (420 - GW) / 2 // centred in the 420 wide box
const GY = 86 // lands the base on the plinth surface in perspective
const DEPTH = 15 // extrusion steps

const PLINTH_CY = 300
const PLINTH_RX = 152
const PLINTH_RY = 40

export function GEmblem({ className }: { className?: string }) {
  const glyph = <use href="#ge-glyph" />

  return (
    <svg
      viewBox="0 0 420 400"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label="The Gexus emblem, a chrome G standing on a turned metal plinth"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <g id="ge-glyph">
          <path d={G_PATH} transform={`translate(${GX} ${GY}) scale(${SCALE})`} />
        </g>

        {/* Face: a chrome ramp with a hard horizon two thirds down, which is
            what separates polished metal from a plain grey gradient. */}
        <linearGradient id="ge-face" x1="0.12" y1="0" x2="0.42" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="14%" stopColor="#d7d9e0" />
          <stop offset="30%" stopColor="#7e808a" />
          <stop offset="45%" stopColor="#f6f7f9" />
          <stop offset="56%" stopColor="#5b5d66" />
          <stop offset="58%" stopColor="#2f3138" />
          <stop offset="72%" stopColor="#9a9ca5" />
          <stop offset="88%" stopColor="#4a4c54" />
          <stop offset="100%" stopColor="#c8cad1" />
        </linearGradient>

        <linearGradient id="ge-extrude" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#6e7078" />
          <stop offset="35%" stopColor="#33353c" />
          <stop offset="70%" stopColor="#17181c" />
          <stop offset="100%" stopColor="#3d3f46" />
        </linearGradient>

        {/* Sweeping specular band. */}
        <linearGradient id="ge-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="38%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="62%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Slower, wider, cooler band travelling the other way. */}
        <linearGradient id="ge-sheen-cool" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cfe0ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#e8f0ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#cfe0ff" stopOpacity="0" />
        </linearGradient>

        {/* Brushed anisotropy that drifts under the sheen. */}
        <linearGradient id="ge-shimmer" x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="34%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="52%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="68%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="84%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="ge-plinth-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f3f5" />
          <stop offset="38%" stopColor="#b6b7bd" />
          <stop offset="68%" stopColor="#eaeaee" />
          <stop offset="100%" stopColor="#8a8b92" />
        </linearGradient>

        <linearGradient id="ge-plinth-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#48494f" />
          <stop offset="17%" stopColor="#bcbdc3" />
          <stop offset="37%" stopColor="#5a5b62" />
          <stop offset="62%" stopColor="#e4e4e8" />
          <stop offset="83%" stopColor="#54555c" />
          <stop offset="100%" stopColor="#8e8f96" />
        </linearGradient>

        <radialGradient id="ge-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#111111" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="ge-bloom" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Fades the reflection out as it travels away from the glyph. */}
        <linearGradient id="ge-reflect-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <mask id="ge-reflect-mask">
          <rect x="0" y={PLINTH_CY - 12} width="420" height="90" fill="url(#ge-reflect-fade)" />
        </mask>

        <clipPath id="ge-clip">{glyph}</clipPath>
        <clipPath id="ge-plinth-clip">
          <ellipse cx="210" cy={PLINTH_CY} rx={PLINTH_RX} ry={PLINTH_RY} />
        </clipPath>
      </defs>

      {/* Ground shadow. */}
      <ellipse cx="210" cy="348" rx="168" ry="34" fill="url(#ge-shadow)" />

      {/* Plinth: side wall, then the polished top face. */}
      <path
        d={`M${210 - PLINTH_RX} ${PLINTH_CY} a${PLINTH_RX} ${PLINTH_RY} 0 0 0 ${PLINTH_RX * 2} 0 v24 a${PLINTH_RX} ${PLINTH_RY} 0 0 1 ${-PLINTH_RX * 2} 0 Z`}
        fill="url(#ge-plinth-side)"
      />
      <ellipse cx="210" cy={PLINTH_CY} rx={PLINTH_RX} ry={PLINTH_RY} fill="url(#ge-plinth-top)" />

      <g clipPath="url(#ge-plinth-clip)">
        {/* Concentric turning marks. */}
        <ellipse cx="210" cy={PLINTH_CY} rx="120" ry="31" fill="none" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="0.9" />
        <ellipse cx="210" cy={PLINTH_CY} rx="84" ry="22" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="0.8" />

        {/* The glyph reflected into the plinth. */}
        <g mask="url(#ge-reflect-mask)">
          <g
            transform={`translate(0 ${(GY + GH) * 2 + 8}) scale(1 -0.42)`}
            fill="#6e7078"
            opacity="0.5"
          >
            {glyph}
          </g>
        </g>

        {/* Highlight travelling around the plinth. */}
        <g className="ge-plinth-sweep">
          <ellipse cx="210" cy={PLINTH_CY} rx="52" ry={PLINTH_RY} fill="url(#ge-bloom)" opacity="0.5" />
        </g>
      </g>

      <ellipse
        cx="210"
        cy={PLINTH_CY}
        rx={PLINTH_RX}
        ry={PLINTH_RY}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="1.1"
      />

      {/* Extrusion. Stacked copies stepping down and slightly right, so the
          light source stays consistent with the face gradient. */}
      <g fill="url(#ge-extrude)">
        {Array.from({ length: DEPTH }, (_, i) => (
          <g key={i} transform={`translate(${(DEPTH - i) * 0.35} ${DEPTH - i})`}>
            {glyph}
          </g>
        ))}
      </g>

      {/* Face. */}
      <g fill="url(#ge-face)">{glyph}</g>

      {/* Everything below is clipped to the letterform. */}
      <g clipPath="url(#ge-clip)">
        <g className="ge-shimmer">
          <rect x="-260" y={GY - 30} width="940" height={GH + 60} fill="url(#ge-shimmer)" />
        </g>

        <g className="ge-sheen-cool">
          <rect
            x="-300"
            y={GY - 60}
            width="230"
            height={GH + 120}
            fill="url(#ge-sheen-cool)"
            transform="skewX(-16)"
          />
        </g>

        <g className="ge-sheen">
          <rect
            x="-220"
            y={GY - 60}
            width="118"
            height={GH + 120}
            fill="url(#ge-sheen)"
            transform="skewX(-16)"
          />
        </g>

        {/* Bevel: the outline stroked twice, once nudged down for the lit top
            edges, once up for the shaded bottom ones. */}
        <g fill="none" strokeWidth="5">
          <g transform="translate(0 3.4)" stroke="rgba(255,255,255,0.75)">
            {glyph}
          </g>
          <g transform="translate(0 -3.6)" stroke="rgba(0,0,0,0.4)">
            {glyph}
          </g>
        </g>
      </g>

      {/* A soft bloom that pulses with the sheen as it clears the glyph. */}
      <ellipse className="ge-bloom" cx="300" cy="150" rx="70" ry="52" fill="url(#ge-bloom)" />
    </svg>
  )
}
