/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // These read from CSS variables (set per-theme in index.css) so the admin
        // can switch the whole site's palette at runtime without a rebuild.
        teal: {
          950: 'rgb(var(--c-primary-950) / <alpha-value>)',
          900: 'rgb(var(--c-primary-900) / <alpha-value>)',
          800: 'rgb(var(--c-primary-800) / <alpha-value>)',
          700: 'rgb(var(--c-primary-700) / <alpha-value>)',
          600: 'rgb(var(--c-primary-600) / <alpha-value>)',
          100: 'rgb(var(--c-primary-100) / <alpha-value>)',
          50: 'rgb(var(--c-primary-50) / <alpha-value>)'
        },
        gold: {
          600: 'rgb(var(--c-accent-600) / <alpha-value>)',
          500: 'rgb(var(--c-accent-500) / <alpha-value>)',
          400: 'rgb(var(--c-accent-400) / <alpha-value>)',
          100: 'rgb(var(--c-accent-100) / <alpha-value>)'
        },
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif']
      },
      maxWidth: {
        prose: '70ch'
      }
    }
  },
  plugins: []
}
