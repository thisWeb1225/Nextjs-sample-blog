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
        'tw-dark': '#111',
        'tw-primary': '#147dfa',
        'tw-secondary': '#f97316',
        'tw-white': '#fff',
        'tw-gray': '#aaa',
      },
      boxShadow: {
        'tw-shadow': '4px 4px 16px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        homeBgFlow: {
          '0%, 100%': {
            'border-radius': '35% 65% 64% 36% / 38% 59% 41% 62%',
            'width': '56px',
          },
          '33%' : {
            'border-radius': '67% 33% 21% 79% / 57% 23% 77% 43%',
            'width': '66px',
            'height': '72px',
          },
          '66%' : {
            'border-radius': '43% 57% 42% 58% / 25% 48% 52% 75%',
            'width': '96px',
            'height': '88px',
          }
        }
      },
      animation: {
        homeBgFlow: 'homeBgFlow 12s linear infinite',
      }
    },
  },
  plugins: ['tailwindcss', 'autoprefixer'],
};