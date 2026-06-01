import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Winity Emerald Noir palette
        'deep-base': '#061C1E',
        'teal-deep': '#0B2E2C',
        'teal-mid': '#0F3F3A',
        'teal-bright': '#135B50',
        'mint': '#21E6A7',
        'aqua': '#3CF2D0',
        'off-white': '#F4F7F6',
        'muted-grey': '#8FA3A0',

        // Copper/Bronze metallic accent — TSS premium signature
        'copper': {
          DEFAULT: '#B87333',
          light: '#CD9A5A',
          bright: '#E8A84E',
          dark: '#8A5520',
        },
      },
      backgroundImage: {
        // Core gradients
        'teal-gradient': 'linear-gradient(135deg, #061C1E 0%, #0B2E2C 50%, #0F3F3A 100%)',
        'teal-radial': 'radial-gradient(ellipse at center, #0F3F3A 0%, #061C1E 70%)',
        'mint-glow': 'radial-gradient(ellipse at center, rgba(33,230,167,0.15) 0%, transparent 70%)',

        // Copper metallic gradient — for logo border, premium CTAs
        'copper-gradient': 'linear-gradient(135deg, #8A5520 0%, #B87333 30%, #E8A84E 55%, #CD9A5A 75%, #B87333 100%)',
        'copper-shine': 'linear-gradient(90deg, #8A5520 0%, #CD9A5A 25%, #E8C97A 50%, #CD9A5A 75%, #8A5520 100%)',

        // Hero overlay
        'hero-vignette': 'radial-gradient(ellipse at center, transparent 30%, rgba(6,28,30,0.7) 100%)',
      },
      boxShadow: {
        'mint-glow': '0 0 40px rgba(33,230,167,0.2), 0 0 80px rgba(33,230,167,0.08)',
        'mint-subtle': '0 0 20px rgba(33,230,167,0.12)',
        'copper-glow': '0 0 30px rgba(184,115,51,0.3), 0 0 60px rgba(184,115,51,0.1)',
        'card-premium': '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(33,230,167,0.08)',
      },
      borderRadius: {
        'card': '20px',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-mint': 'pulse-mint 2.5s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse',
        'copper-shimmer': 'copper-shimmer 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-mint': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'copper-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      letterSpacing: {
        'eyebrow': '0.2em',
      },
    },
  },
  plugins: [tailwindAnimate],
}
