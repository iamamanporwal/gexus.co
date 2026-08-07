/**
 * Generates every static illustration in public/images.
 *
 * The artwork is authored here rather than inline in components so the SVG
 * leaves the HTML and RSC payload entirely and gets cached by the browser as
 * a plain file. Run with `npm run art` after changing anything below.
 *
 * The hero part (public/images/hero-lattice.webp) is not produced here. It is
 * a render of the woven lattice described in art/hero-lattice-scene.tsx; see
 * the README for how to regenerate it.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DEST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')
fs.mkdirSync(DEST, { recursive: true })

const write = (name, svg) => {
  const min = svg.replace(/\n\s*/g, ' ').replace(/>\s+</g, '><').trim()
  fs.writeFileSync(path.join(DEST, name), min)
  console.log(name.padEnd(26), (min.length / 1024).toFixed(1) + ' kb')
}

/* ------------------------------------------------------------------ *
 * Shared geometry: a three armed drone motor mount.
 * ------------------------------------------------------------------ */

const hypot = (a, b) => Math.sqrt(a * a + b * b)

/** Tapered, slightly bowed web between two bosses. */
function strut(a, b, wa, wb, bow) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const mx = (a.x + b.x) / 2 + nx * bow
  const my = (a.y + b.y) / 2 + ny * bow
  const p = (pt, w, s) => `${(pt.x + nx * w * s).toFixed(1)},${(pt.y + ny * w * s).toFixed(1)}`
  const c = (s) =>
    `${(mx + nx * ((wa + wb) / 2) * s).toFixed(1)},${(my + ny * ((wa + wb) / 2) * s).toFixed(1)}`
  return `M ${p(a, wa, 1)} Q ${c(1)} ${p(b, wb, 1)} L ${p(b, wb, -1)} Q ${c(-1)} ${p(a, wa, -1)} Z`
}

const HUB = { c: { x: 152, y: 116 }, r: 36, bore: 12 }
const ARMS = [
  { c: { x: 56, y: 74 }, r: 25, bore: 8.5 },
  { c: { x: 248, y: 66 }, r: 23, bore: 8 },
  { c: { x: 214, y: 168 }, r: 21, bore: 7 },
]
const BOWS = [-8, 7, -6]
const BOSSES = [HUB, ...ARMS]
const WEBS = ARMS.map((a, i) => strut(HUB.c, a.c, HUB.r * 0.86, a.r * 0.9, BOWS[i]))

const steelGradient = (id) => `
  <linearGradient id="${id}" x1="0.15" y1="0" x2="0.8" y2="1">
    <stop offset="0%" stop-color="#F2F2F4"/>
    <stop offset="22%" stop-color="#CBCBD1"/>
    <stop offset="46%" stop-color="#9FA0A7"/>
    <stop offset="64%" stop-color="#DEDEE2"/>
    <stop offset="84%" stop-color="#8C8D95"/>
    <stop offset="100%" stop-color="#B4B5BC"/>
  </linearGradient>`

const commonDefs = (id) => `
  ${steelGradient(`${id}-body`)}
  <linearGradient id="${id}-rim" x1="0" y1="0" x2="0.9" y2="1">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
    <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.25"/>
    <stop offset="100%" stop-color="#5F6067" stop-opacity="0.55"/>
  </linearGradient>
  <radialGradient id="${id}-bore" cx="0.36" cy="0.28" r="0.9">
    <stop offset="0%" stop-color="#8B8C93"/>
    <stop offset="55%" stop-color="#6A6B72"/>
    <stop offset="100%" stop-color="#A9AAB1"/>
  </radialGradient>
  <linearGradient id="${id}-sheen" x1="0" y1="0" x2="0.7" y2="1">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
    <stop offset="60%" stop-color="#FFFFFF" stop-opacity="0.06"/>
    <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
  </linearGradient>
  <filter id="${id}-drop" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#111111" flood-opacity="0.14"/>
  </filter>
  <clipPath id="${id}-clip">
    ${WEBS.map((d) => `<path d="${d}"/>`).join('')}
    ${BOSSES.map((b) => `<circle cx="${b.c.x}" cy="${b.c.y}" r="${b.r}"/>`).join('')}
  </clipPath>`

/** The solid part, shared by most tiles. `infill` draws inside the clip. */
function solidPart(id, { fill = `url(#${id}-body)`, infill = '', extra = '' } = {}) {
  return `
  <g filter="url(#${id}-drop)">
    ${WEBS.map((d) => `<path d="${d}" fill="${fill}"/>`).join('')}
    ${BOSSES.map((b) => `<circle cx="${b.c.x}" cy="${b.c.y}" r="${b.r}" fill="${fill}"/>`).join('')}
    <g clip-path="url(#${id}-clip)">
      <path d="M-20 -20 L 340 -20 L 200 220 L -20 120 Z" fill="url(#${id}-sheen)" opacity="0.6"/>
      ${infill}
      ${BOSSES.map(
        (b) =>
          `<circle cx="${b.c.x}" cy="${b.c.y}" r="${(b.r * 0.74).toFixed(1)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.1"/>`,
      ).join('')}
    </g>
    ${WEBS.map((d) => `<path d="${d}" fill="none" stroke="url(#${id}-rim)" stroke-width="1"/>`).join('')}
    ${BOSSES.map(
      (b) =>
        `<circle cx="${b.c.x}" cy="${b.c.y}" r="${b.r}" fill="none" stroke="url(#${id}-rim)" stroke-width="1"/>`,
    ).join('')}
    ${BOSSES.map(
      (b) => `
      <circle cx="${b.c.x}" cy="${b.c.y}" r="${b.bore}" fill="url(#${id}-bore)"/>
      <path d="M${b.c.x - b.bore} ${b.c.y} a${b.bore} ${b.bore} 0 0 1 ${b.bore * 2} 0" fill="none" stroke="#5C5D64" stroke-opacity="0.55" stroke-width="1.1"/>
      <path d="M${b.c.x + b.bore} ${b.c.y} a${b.bore} ${b.bore} 0 0 1 ${-b.bore * 2} 0" fill="none" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.1"/>`,
    ).join('')}
    ${extra}
  </g>`
}

const doc = (body, w = 300, h = 200) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img">${body}</svg>`

/* ------------------------------------------------------------------ *
 * Concept variants. Each one has to read as a genuinely different
 * answer to the same brief, not a recolour of the last.
 * ------------------------------------------------------------------ */

/** Triangulated infill across the three webs. */
function latticeInfill() {
  const lines = []
  for (const [i, arm] of ARMS.entries()) {
    const steps = 7
    for (let s = 1; s < steps; s++) {
      const t = s / steps
      const x = HUB.c.x + (arm.c.x - HUB.c.x) * t
      const y = HUB.c.y + (arm.c.y - HUB.c.y) * t
      const dx = arm.c.x - HUB.c.x
      const dy = arm.c.y - HUB.c.y
      const len = hypot(dx, dy) || 1
      const nx = (-dy / len) * 26
      const ny = (dx / len) * 26
      const sign = s % 2 === 0 ? 1 : -1
      lines.push(
        `<path d="M${(x + nx).toFixed(1)} ${(y + ny).toFixed(1)} L${(x - nx * sign * 0.6).toFixed(1)} ${(y - ny * sign * 0.6).toFixed(1)}" stroke="#6E6F76" stroke-opacity="0.5" stroke-width="2.4" fill="none"/>`,
      )
      lines.push(
        `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7" ry="4.5" fill="#74757C" opacity="${0.32 + (i % 2) * 0.08}"/>`,
      )
    }
  }
  return lines.join('')
}

/** Straight radial ribs with lightening slots between them. */
function ribbedInfill() {
  const out = []
  for (const arm of ARMS) {
    const dx = arm.c.x - HUB.c.x
    const dy = arm.c.y - HUB.c.y
    const len = hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    for (let s = 1; s < 5; s++) {
      const t = s / 5
      const x = HUB.c.x + dx * t
      const y = HUB.c.y + dy * t
      out.push(
        `<path d="M${(x + nx * 22).toFixed(1)} ${(y + ny * 22).toFixed(1)} L${(x - nx * 22).toFixed(1)} ${(y - ny * 22).toFixed(1)}" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="3" fill="none"/>`,
      )
      out.push(
        `<path d="M${(x + nx * 15).toFixed(1)} ${(y + ny * 15).toFixed(1)} L${(x - nx * 15).toFixed(1)} ${(y - ny * 15).toFixed(1)}" stroke="#63646B" stroke-opacity="0.45" stroke-width="6" stroke-linecap="round" fill="none"/>`,
      )
    }
  }
  return out.join('')
}

write(
  'concept-lattice.svg',
  doc(`<defs>${commonDefs('cl')}</defs>${solidPart('cl', { infill: latticeInfill() })}`),
)
write(
  'concept-ribbed.svg',
  doc(`<defs>${commonDefs('cr')}</defs>${solidPart('cr', { infill: ribbedInfill() })}`),
)
write('concept-shell.svg', doc(`<defs>${commonDefs('cs')}</defs>${solidPart('cs')}`))

/* ------------------------------------------------------------------ *
 * Process strip: sketch, model, stress plot, machining, inspection.
 * ------------------------------------------------------------------ */

// 1. Concept sketch with construction geometry and a dimension line.
const sketch = `
  <g fill="none" stroke="#A6A6AC" stroke-width="0.9">
    ${WEBS.map((d) => `<path d="${d}" stroke-dasharray="5 3.5"/>`).join('')}
    ${BOSSES.map(
      (b) =>
        `<circle cx="${b.c.x}" cy="${b.c.y}" r="${b.r}" stroke-dasharray="5 3.5"/><circle cx="${b.c.x}" cy="${b.c.y}" r="${b.bore}"/>`,
    ).join('')}
    ${ARMS.map(
      (a) =>
        `<path d="M${HUB.c.x} ${HUB.c.y} L${a.c.x} ${a.c.y}" stroke="#C6C6CC" stroke-width="0.6" stroke-dasharray="2 4"/>`,
    ).join('')}
    <path d="M56 190 H248" stroke="#B4B4BA" stroke-width="0.7"/>
    <path d="M56 186 V194 M248 186 V194" stroke="#B4B4BA" stroke-width="0.7"/>
  </g>
  <text x="152" y="184" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" fill="#9A9AA1">192.0</text>`
write('step-sketch.svg', doc(sketch))

// 2. Solid model.
write('step-model.svg', doc(`<defs>${commonDefs('sm')}</defs>${solidPart('sm')}`))

// 3. Stress plot with a legend so it reads as analysis output, not decoration.
// Named `st-heat` rather than `st-body`: commonDefs already defines a
// `-body` gradient, and a duplicate id would silently win over this one.
const stressRamp = `
  <linearGradient id="st-heat" x1="0.1" y1="0" x2="0.85" y2="1">
    <stop offset="0%" stop-color="#2E3AA8"/>
    <stop offset="24%" stop-color="#1E86C9"/>
    <stop offset="46%" stop-color="#27B98F"/>
    <stop offset="68%" stop-color="#C6D63A"/>
    <stop offset="88%" stop-color="#E8891F"/>
    <stop offset="100%" stop-color="#D9412F"/>
  </linearGradient>
  <linearGradient id="st-legend" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#2E3AA8"/>
    <stop offset="35%" stop-color="#27B98F"/>
    <stop offset="70%" stop-color="#C6D63A"/>
    <stop offset="100%" stop-color="#D9412F"/>
  </linearGradient>`
write(
  'step-stress.svg',
  doc(`
    <defs>${commonDefs('st')}${stressRamp}</defs>
    ${solidPart('st', { fill: 'url(#st-heat)' })}
    <g>
      <rect x="272" y="34" width="9" height="132" rx="2" fill="url(#st-legend)"/>
      <rect x="272" y="34" width="9" height="132" rx="2" fill="none" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="0.6"/>
      <text x="286" y="39" font-family="Inter, sans-serif" font-size="7" fill="#6B7280">MPa</text>
      <text x="286" y="169" font-family="Inter, sans-serif" font-size="7" fill="#6B7280">0</text>
    </g>`),
)

// 4. Five axis machining.
const machining = `
  <defs>
    <linearGradient id="mc-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A4A50"/>
      <stop offset="55%" stop-color="#232327"/>
      <stop offset="100%" stop-color="#0E0E10"/>
    </linearGradient>
    <linearGradient id="mc-tool" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6E6E76"/>
      <stop offset="30%" stop-color="#E4E4E8"/>
      <stop offset="55%" stop-color="#9B9BA3"/>
      <stop offset="100%" stop-color="#4C4C53"/>
    </linearGradient>
    <radialGradient id="mc-spark" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="300" height="200" fill="url(#mc-bg)"/>
  <rect x="118" y="-10" width="64" height="62" rx="6" fill="url(#mc-tool)"/>
  <rect x="130" y="50" width="40" height="34" rx="4" fill="#3A3A41"/>
  <path d="M138 84 h24 l-5 34 h-14 Z" fill="url(#mc-tool)"/>
  <rect x="145" y="118" width="10" height="24" fill="#D8D8DE"/>
  <rect x="52" y="142" width="196" height="34" rx="4" fill="#5B5B63"/>
  <rect x="52" y="142" width="196" height="6" fill="#8E8E97"/>
  <g stroke="#8E8E97" stroke-opacity="0.5" stroke-width="1" fill="none">
    <path d="M62 158 H238 M62 166 H238"/>
  </g>
  <rect x="30" y="176" width="240" height="24" fill="#17171A"/>
  <circle cx="150" cy="144" r="34" fill="url(#mc-spark)" opacity="0.7"/>
  ${[
    [168, 132],
    [180, 140],
    [128, 130],
    [116, 138],
    [190, 126],
  ]
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#FFFFFF" opacity="${0.75 - i * 0.1}"/>`)
    .join('')}`
write('step-machining.svg', doc(machining))

// 5. Inspection: probe points and a tolerance callout.
const probes = BOSSES.map(
  (b) => `
  <circle cx="${b.c.x}" cy="${b.c.y}" r="${b.r + 6}" fill="none" stroke="#111111" stroke-opacity="0.28" stroke-width="0.8" stroke-dasharray="3 3"/>
  <circle cx="${b.c.x + b.r + 6}" cy="${b.c.y}" r="2.6" fill="#111111" opacity="0.55"/>`,
).join('')
write(
  'step-inspection.svg',
  doc(`
    <defs>${commonDefs('in')}</defs>
    ${solidPart('in', { extra: probes })}
    <g font-family="Inter, sans-serif" font-size="8" fill="#6B7280">
      <path d="M214 176 L246 190" stroke="#B4B4BA" stroke-width="0.7" fill="none"/>
      <text x="249" y="193">0.02</text>
    </g>`),
)

/* ------------------------------------------------------------------ *
 * Robotics lab plate.
 * ------------------------------------------------------------------ */

const lab = `
  <defs>
    <linearGradient id="lb-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FEFEFE"/><stop offset="38%" stop-color="#EDEDEF"/><stop offset="100%" stop-color="#D5D5D9"/>
    </linearGradient>
    <linearGradient id="lb-haze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.92"/><stop offset="34%" stop-color="#FFFFFF" stop-opacity="0.34"/>
      <stop offset="72%" stop-color="#FFFFFF" stop-opacity="0.18"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.42"/>
    </linearGradient>
    <linearGradient id="lb-edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/><stop offset="26%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="lb-machine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A9A9AF"/><stop offset="55%" stop-color="#77777E"/><stop offset="100%" stop-color="#4A4A50"/>
    </linearGradient>
    <linearGradient id="lb-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#DCDCE0"/><stop offset="100%" stop-color="#BCBCC2"/>
    </linearGradient>
    <filter id="lb-soft" x="-8%" y="-8%" width="116%" height="116%"><feGaussianBlur stdDeviation="0.9"/></filter>
    <filter id="lb-far" x="-8%" y="-8%" width="116%" height="116%"><feGaussianBlur stdDeviation="3.4"/></filter>
  </defs>
  <rect width="1200" height="700" fill="url(#lb-bg)"/>
  <g filter="url(#lb-far)" opacity="0.34" stroke="#6E6E75" fill="none">
    <path d="M0 96 H1200" stroke-width="5"/><path d="M0 150 H1200" stroke-width="3"/><path d="M0 196 H1200" stroke-width="2"/>
    ${Array.from({ length: 16 }, (_, i) => `<path d="M${-40 + i * 82} 60 L${-40 + i * 82} 200" stroke-width="2"/>`).join('')}
    ${Array.from({ length: 15 }, (_, i) => `<path d="M${-40 + i * 82} 96 L${42 + i * 82} 150" stroke-width="1.4"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<rect x="${54 + i * 106}" y="88" width="64" height="9" fill="#FFFFFF" stroke="none"/>`).join('')}
  </g>
  <g filter="url(#lb-far)" opacity="0.32" fill="#7A7A81">
    <rect x="10" y="262" width="188" height="196" rx="6"/><rect x="214" y="304" width="104" height="154" rx="5"/>
    <rect x="892" y="292" width="96" height="166" rx="5"/><rect x="1004" y="252" width="188" height="206" rx="6"/>
    <rect x="330" y="330" width="60" height="128" rx="4"/><rect x="820" y="336" width="56" height="122" rx="4"/>
  </g>
  <rect x="0" y="458" width="1200" height="242" fill="url(#lb-floor)"/>
  <g stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.6">
    ${Array.from({ length: 11 }, (_, i) => `<path d="M${600 + (i - 5) * 54} 458 L${600 + (i - 5) * 210} 700"/>`).join('')}
    <path d="M0 520 H1200" stroke-opacity="0.18"/><path d="M0 600 H1200" stroke-opacity="0.14"/>
  </g>
  <g filter="url(#lb-soft)">
    <rect x="352" y="404" width="496" height="66" rx="5" fill="url(#lb-machine)"/>
    <rect x="352" y="404" width="496" height="7" fill="#B7B7BD"/>
    <rect x="378" y="470" width="18" height="52" fill="#5E5E65"/><rect x="804" y="470" width="18" height="52" fill="#5E5E65"/>
    <rect x="470" y="300" width="260" height="106" rx="10" fill="url(#lb-machine)"/>
    <rect x="404" y="332" width="72" height="74" rx="7" fill="#63636A"/><rect x="724" y="332" width="72" height="74" rx="7" fill="#63636A"/>
    <circle cx="600" cy="352" r="42" fill="#45454B"/><circle cx="600" cy="352" r="25" fill="#9A9AA1"/><circle cx="600" cy="352" r="10" fill="#2C2C31"/>
    ${Array.from({ length: 7 }, (_, i) => `<rect x="${492 + i * 32}" y="312" width="14" height="26" rx="3" fill="#54545B"/>`).join('')}
    <path d="M312 424 L 252 336 L 322 272" stroke="#63636A" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M888 424 L 948 336 L 878 272" stroke="#63636A" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="252" cy="336" r="15" fill="#45454B"/><circle cx="948" cy="336" r="15" fill="#45454B"/>
    <circle cx="312" cy="424" r="19" fill="#54545B"/><circle cx="888" cy="424" r="19" fill="#54545B"/>
    <rect x="330" y="470" width="540" height="34" rx="4" fill="#54545B"/>
    ${Array.from({ length: 13 }, (_, i) => `<circle cx="${352 + i * 42}" cy="487" r="10" fill="#8B8B92"/>`).join('')}
  </g>
  <g fill="#202024">
    <ellipse cx="600" cy="662" rx="52" ry="9" opacity="0.24"/>
    <circle cx="600" cy="452" r="21"/>
    <path d="M600 474 c-24 0 -39 15 -43 40 l-7 44 h100 l-7 -44 c-4 -25 -19 -40 -43 -40 Z"/>
    <path d="M566 512 l-9 46 h13 l10 -42 Z"/><path d="M634 512 l9 46 h-13 l-10 -42 Z"/>
    <path d="M572 558 h22 l-3 96 h-18 Z"/><path d="M606 558 h22 l-1 96 h-18 Z"/>
  </g>
  <rect width="1200" height="700" fill="url(#lb-haze)"/>
  <rect width="1200" height="700" fill="url(#lb-edge)"/>`
write('lab.svg', doc(lab, 1200, 700))

console.log('\ndone')
