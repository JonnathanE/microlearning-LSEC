/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      },
      colors: {
        "bookmark-purple": "#5267DF",
        "bookmark-red": "#FA5959",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
        "bookmark-cyan-500": "#00ADB5",
        "bookmark-cyan-400": "#20b7c2",
        "bookmark-cyan-100": "#cffafe",
        gray: {
          600: '#606060'
        }
      },
      spacing: {
        '13': '3.25rem',
      },
      boxShadow: {
        primary: '0px 9.9px 21.6px rgba(39, 245, 226, 0.41)',
        secondary: '0px 9.9px 21.6px rgba(255, 255, 255, 0.41)'
      }
    },
  },
  plugins: [],
}
