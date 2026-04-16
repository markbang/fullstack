import { colors, fonts, shadows } from '@repo/design-tokens'
import { presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'

export function createUnoConfig() {
  return {
    theme: {
      colors,
      boxShadow: shadows,
      fontFamily: fonts,
    },
    shortcuts: {
      'stack-shell': 'mx-auto w-full max-w-6xl px-6 lg:px-8',
      'stack-panel':
        'rounded-3xl border border-white/10 bg-white/6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur',
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
