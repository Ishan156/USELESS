/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cemetery: {
          bg: '#080c08',
          card: '#101710',
          stone: '#7f9389',
          moss: '#344e2f',
          darkgreen: '#1a2718',
          candle: '#f59e0b',
          fog: '#9ab3a0',
          border: '#1f2e1f',
        }
      }
    },
  },
  plugins: [],
}
