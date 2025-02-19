/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        jersey: ['"Jersey 10"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['inter', 'sans-serif'],
      },
      colors: {
        nav: '#0A1418',
        background: '#1E2431',
      }
    },
  },
  plugins: [],
}

