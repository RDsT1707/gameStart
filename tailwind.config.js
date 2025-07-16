/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // bleu foncé
        secondary: "#2563eb", // bleu clair
        light: "#f3f4f6", // gris clair
        danger: "#ef4444", // rouge
      },
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};
