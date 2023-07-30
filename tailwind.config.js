/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'billabong': ['Billabong']
      },
    },
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
  plugins: [],
}

