import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          button: colors.blue[400],
          buttonhover: colors.blue[600],
          hover: colors.neutral[300],
          clickable: colors.blue[500]
        }
      },
    },
    plugins: [],
  }
}