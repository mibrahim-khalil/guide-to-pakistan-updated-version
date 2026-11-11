/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(15, 47, 34, 0.10)",
      },
    },
  },

  corePlugins: {
    preflight: false,
  },

  plugins: [],
};