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
    scale: {
      '-100': '-1',
    }
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
  plugins: [],
}

