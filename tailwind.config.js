/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "tw-dark": "#23232d",
      "tw-primary": "#2ecce0",
      "tw-white": "#fff",
      "tw-gray": "#333",
    },
    extend: {},
  },
  plugins: [],
}

