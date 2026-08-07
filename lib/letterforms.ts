/**
 * The Gexus letterforms.
 *
 * A custom geometric extended sans in the Eurostile Extended and Microgramma
 * tradition. Every glyph is a squared off rectangle on a 118 by 100 grid with
 * a single uniform stroke weight, generous rounded square corners on the
 * outside, tighter radii in the counters, and small chamfers on the terminals.
 *
 * Glyphs are vertex lists rather than path data, so adjusting a letter means
 * moving a number. Shared by the wordmark and the emblem, which is what keeps
 * the two in the same family.
 */

export const CAP_HEIGHT = 100
export const GLYPH_WIDTH = 118
export const STROKE = 19
export const TRACKING = 46

const R = 20 // outer corner radius, kept tight: Eurostile reads square first
const RI = 9 // counter corner radius
const T = 5 // terminal chamfer

const H = CAP_HEIGHT
const W = GLYPH_WIDTH
const S = STROKE

export type Vertex = [x: number, y: number, r: number]

/**
 * Rounds the corners of a closed polygon. Each vertex is trimmed back along
 * both adjacent edges and bridged with a quadratic through the original
 * corner, which lands a touch squarer than a true arc. That is exactly the
 * superellipse feel these letterforms want.
 */
export function roundedPath(pts: Vertex[]): string {
  const n = pts.length
  let d = ''

  for (let i = 0; i < n; i++) {
    const [px, py, pr] = pts[i]
    const [ax, ay] = pts[(i - 1 + n) % n]
    const [bx, by] = pts[(i + 1) % n]

    const d1 = Math.hypot(ax - px, ay - py) || 1
    const d2 = Math.hypot(bx - px, by - py) || 1
    const r = Math.min(pr, d1 / 2, d2 / 2)

    const start = { x: px + ((ax - px) / d1) * r, y: py + ((ay - py) / d1) * r }
    const end = { x: px + ((bx - px) / d2) * r, y: py + ((by - py) / d2) * r }

    // One decimal is well below a pixel at any size these are used.
    const f = (v: number) => Math.round(v * 10) / 10
    d += `${i === 0 ? 'M' : 'L'}${f(start.x)} ${f(start.y)}`
    d += r > 0.05 ? `Q${f(px)} ${f(py)} ${f(end.x)} ${f(end.y)}` : ''
  }

  return d + 'Z'
}

// G: a rounded square bowl with an aperture on the upper right and a crossbar
// running in from the lower right stem.
const G_APERTURE_TOP = 42
const G_BAR_TOP = 55
const G_BAR_BOTTOM = G_BAR_TOP + S
const G_BAR_LEFT = 50

export const GLYPH_G: Vertex[] = [
  [0, 0, R],
  [W, 0, R],
  [W, G_APERTURE_TOP, T],
  [W - S, G_APERTURE_TOP, T],
  [W - S, S, RI],
  [S, S, RI],
  [S, H - S, RI],
  [W - S, H - S, RI],
  [W - S, G_BAR_BOTTOM, 8],
  [G_BAR_LEFT, G_BAR_BOTTOM, 9],
  [G_BAR_LEFT, G_BAR_TOP, 9],
  [W - S, G_BAR_TOP, T],
  [W, G_BAR_TOP, T],
  [W, H, R],
  [0, H, R],
]

// E: stem plus three arms, the middle one pulled slightly short.
const E_MID_TOP = (H - S) / 2
const E_MID_BOTTOM = E_MID_TOP + S
const E_MID_RIGHT = 104

export const GLYPH_E: Vertex[] = [
  [0, 0, R],
  [W, 0, T],
  [W, S, T],
  [S, S, RI],
  [S, E_MID_TOP, 9],
  [E_MID_RIGHT, E_MID_TOP, T],
  [E_MID_RIGHT, E_MID_BOTTOM, T],
  [S, E_MID_BOTTOM, 9],
  [S, H - S, RI],
  [W, H - S, T],
  [W, H, T],
  [0, H, R],
]

// X: two parallel edged diagonal bands whose terminals land square on the
// corners of the box.
const X_TW = 30 // horizontal width of each terminal
const X_MID_X = W / 2
const X_NOTCH_Y = (H * (W - 2 * X_TW)) / (2 * (W - X_TW))
const X_SIDE_X = (W - X_TW) / 2

export const GLYPH_X: Vertex[] = [
  [0, 0, T],
  [X_TW, 0, T],
  [X_MID_X, X_NOTCH_Y, 7],
  [W - X_TW, 0, T],
  [W, 0, T],
  [W - X_SIDE_X, H / 2, 7],
  [W, H, T],
  [W - X_TW, H, T],
  [X_MID_X, H - X_NOTCH_Y, 7],
  [X_TW, H, T],
  [0, H, T],
  [X_SIDE_X, H / 2, 7],
]

// U: two stems bridged by a rounded square bottom.
export const GLYPH_U: Vertex[] = [
  [0, 0, T],
  [S, 0, T],
  [S, H - S, RI],
  [W - S, H - S, RI],
  [W - S, 0, T],
  [W, 0, T],
  [W, H, R],
  [0, H, R],
]

// S: three horizontals linked by a stem on the upper left and one on the
// lower right.
const S_MID_TOP = (H - S) / 2
const S_MID_BOTTOM = S_MID_TOP + S

export const GLYPH_S: Vertex[] = [
  [0, 0, R],
  [W, 0, T],
  [W, S, T],
  [S, S, RI],
  [S, S_MID_TOP, RI],
  [W, S_MID_TOP, T],
  [W, H, R],
  [0, H, R],
  [0, H - S, T],
  [W - S, H - S, RI],
  [W - S, S_MID_BOTTOM, RI],
  [0, S_MID_BOTTOM, T],
]

export const WORDMARK_GLYPHS = [GLYPH_G, GLYPH_E, GLYPH_X, GLYPH_U, GLYPH_S]

export const G_PATH = roundedPath(GLYPH_G)
