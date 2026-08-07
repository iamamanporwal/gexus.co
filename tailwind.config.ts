import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F1F1F1',
        surface: '#FFFFFF',
        card: '#FAFAFA',
        line: '#E6E6E8',
        ink: '#111111',
        muted: '#6B7280',
        ink900: '#0A0A0A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '24px',
        btn: '18px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17,17,17,0.03), 0 8px 24px rgba(17,17,17,0.04)',
        lift: '0 2px 4px rgba(17,17,17,0.04), 0 18px 44px rgba(17,17,17,0.08)',
        glass: '0 1px 2px rgba(17,17,17,0.04), 0 24px 60px rgba(17,17,17,0.10)',
      },
      maxWidth: {
        shell: '1360px',
      },
      letterSpacing: {
        tightest: '-0.045em',
        label: '0.16em',
      },
      fontSize: {
        // Tightened, slightly larger scale than the default steps.
        micro: ['11px', { lineHeight: '1.45' }],
        label: ['12px', { lineHeight: '1.5' }],
        body: ['14.5px', { lineHeight: '1.72' }],
        lede: ['16px', { lineHeight: '1.7' }],
      },
    },
  },
  plugins: [],
}

export default config
