/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        paperSoft: 'rgb(var(--color-paper-soft) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        accentSoft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        card: '0 24px 80px rgba(34, 27, 22, 0.08)'
      },
      backgroundImage: {
        'page-glow': 'radial-gradient(circle at top left, rgba(176, 104, 74, 0.18), transparent 38%), radial-gradient(circle at top right, rgba(76, 92, 120, 0.12), transparent 34%)'
      },
      maxWidth: {
        measure: '72ch'
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-ink) / 0.9)',
            '--tw-prose-headings': 'rgb(var(--color-ink) / 1)',
            '--tw-prose-lead': 'rgb(var(--color-muted) / 1)',
            '--tw-prose-links': 'rgb(var(--color-accent) / 1)',
            '--tw-prose-bold': 'rgb(var(--color-ink) / 1)',
            '--tw-prose-counters': 'rgb(var(--color-muted) / 1)',
            '--tw-prose-bullets': 'rgb(var(--color-accent) / 0.7)',
            '--tw-prose-hr': 'rgb(var(--color-line) / 1)',
            '--tw-prose-quotes': 'rgb(var(--color-ink) / 1)',
            '--tw-prose-quote-borders': 'rgb(var(--color-accent) / 0.4)',
            '--tw-prose-captions': 'rgb(var(--color-muted) / 1)',
            '--tw-prose-code': 'rgb(var(--color-ink) / 1)',
            '--tw-prose-pre-code': 'rgb(245 239 233 / 1)',
            '--tw-prose-pre-bg': 'rgb(34 27 22 / 1)',
            '--tw-prose-th-borders': 'rgb(var(--color-line) / 1)',
            '--tw-prose-td-borders': 'rgb(var(--color-line) / 0.65)'
          }
        },
        invert: {
          css: {
            '--tw-prose-body': 'rgb(235 229 222 / 0.9)',
            '--tw-prose-headings': 'rgb(248 244 239 / 1)',
            '--tw-prose-links': 'rgb(231 156 124 / 1)',
            '--tw-prose-bold': 'rgb(248 244 239 / 1)',
            '--tw-prose-counters': 'rgb(173 162 151 / 1)',
            '--tw-prose-bullets': 'rgb(231 156 124 / 0.7)',
            '--tw-prose-hr': 'rgb(88 80 74 / 1)',
            '--tw-prose-quotes': 'rgb(248 244 239 / 1)',
            '--tw-prose-quote-borders': 'rgb(231 156 124 / 0.35)',
            '--tw-prose-code': 'rgb(248 244 239 / 1)',
            '--tw-prose-pre-code': 'rgb(248 244 239 / 0.9)',
            '--tw-prose-pre-bg': 'rgb(24 22 20 / 1)',
            '--tw-prose-th-borders': 'rgb(88 80 74 / 1)',
            '--tw-prose-td-borders': 'rgb(88 80 74 / 0.6)'
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
