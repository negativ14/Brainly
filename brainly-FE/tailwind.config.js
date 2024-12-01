/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      gridAutoRows: {
        masonry: 'minmax(10px, auto)', // Adjust the "minmax" values as needed
      },
    },
  },
  plugins: [],
}

