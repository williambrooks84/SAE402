/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',                 // Path to your HTML file
    './src/**/*.{js,jsx,ts,tsx,html}' // All JS and HTML files in src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        jersey: ['"Jersey 10"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}