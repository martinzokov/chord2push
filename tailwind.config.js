/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'push-red': '#ff4757',
        'push-pad': '#D4A574',
        'push-dark': '#2c2c2c',
        'push-grid': '#1a1a1a',
      },
    },
  },
  plugins: [],
} 