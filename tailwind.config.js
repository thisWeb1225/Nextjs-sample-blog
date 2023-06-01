/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tw-dark': '#23232d',
        'tw-primary': '#2ecce0',
        'tw-white': '#fff',
        'tw-gray': '#aaa',
      },
      boxShadow: {
        'tw-shadow': '4px 4px 16px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        'open-sans': ['Open Sans']
      }
    },
  },
  plugins: ['tailwindcss', 'autoprefixer'],
};
