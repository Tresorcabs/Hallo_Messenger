/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#148763',
        'primary-bold': '#106C52',
        'secondary-btn-bg': '#EEFBF5',
        'primary-200': '#27A584',
        'behind-input': '#0C7E47',
      },
      radius: {
        'l-5xl': '10rem',
      }
    },
  },
  plugins: [],
}

