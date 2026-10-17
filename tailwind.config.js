/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        negro: '#090909',
        'crema-oscuro': '#ab8b6e',
        crema: '#b4a28d',
        'crema-claro': '#dfd8cf',
        gris: '#e8e5e0',
        dorado: {
          light: '#f4e8c1',
          DEFAULT: '#d4af37',
          dark: '#aa820a',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(9, 9, 9, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(171, 139, 110, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
