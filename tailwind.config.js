/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#0A2E2B',
          900: '#0D3B37',
          800: '#0F4F4A',
          700: '#146B63',
          600: '#1B8577',
          100: '#DFEFEA',
          50: '#F2F8F6'
        },
        gold: {
          600: '#B8863B',
          500: '#D0A24C',
          400: '#E0B961',
          100: '#FAF1DE'
        },
        ink: '#12201E',
        sand: '#FBF9F5'
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
