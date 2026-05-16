/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c87a',
          lighter: '#f0d898',
          dark: '#a07830',
        },
        savoria: {
          bg: '#0a0a0a',
          bg2: '#111111',
          bg3: '#1a1a1a',
          bg4: '#222222',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c, #e8c87a)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a, #111111)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseGold: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' }, '50%': { boxShadow: '0 0 0 10px rgba(201, 168, 76, 0)' } },
      },
    },
  },
  plugins: [],
}
