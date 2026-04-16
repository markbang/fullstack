import { presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'

export function createUnoConfig() {
  return {
    theme: {
      colors: {
        accent: {
          DEFAULT: '#6ee7d8',
          soft: '#8ff0e5',
          deep: '#103c3e',
        },
        surface: {
          DEFAULT: '#0a0a0b',
          muted: '#121214',
          panel: 'rgba(255,255,255,0.06)',
        },
      },
      boxShadow: {
        glow: '0 24px 80px rgba(7, 211, 201, 0.18)',
        panel: '0 24px 60px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
      },
    },
    shortcuts: {
      'stack-shell': 'mx-auto w-full max-w-6xl px-6 lg:px-8',
      'stack-panel': 'rounded-3xl border border-white/10 bg-white/6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur',
      'stack-label': 'text-xs font-semibold uppercase tracking-[0.24em] text-white/55',
      'stack-muted': 'text-sm leading-6 text-white/68 md:text-base',
      'stack-grid': 'grid gap-4 md:grid-cols-2 xl:grid-cols-4',
    },
    presets: [
      presetWind4(),
      presetIcons({
        scale: 1.15,
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
        },
      }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
  }
}
