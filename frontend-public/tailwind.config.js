/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/features/tiss/**/*.{js,jsx}",
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