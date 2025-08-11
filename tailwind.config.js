/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "767px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    }
  },
  plugins: [],
};