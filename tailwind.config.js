  /** @type {import('tailwindcss').Config} */
  export default {
      content: ["./src/**/*.{html,js}", "index.html"],
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
      };