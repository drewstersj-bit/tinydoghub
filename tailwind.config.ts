import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'warm-white': '#FDFBF7',
        'soft-grey': '#E8E4DF',
        charcoal: '#2D2D2D',
        'forest-green': '#2D5016',
        'muted-sage': '#7A9B6D',
        'warm-beige': '#D4C5B2',
        'deep-coral': '#E8614D',
        dark: {
          bg: '#1A1A1A',
          surface: '#252525',
          border: '#3A3A3A',
          text: '#E8E4DF',
          muted: '#9A9590',
        },
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h1: ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h2: ['2rem', { lineHeight: '1.3' }],
        h3: ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        card: '0.75rem',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
