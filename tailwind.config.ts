import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes:{
        'fade-in-down': {
          '0%': {
              opacity: '0',
              transform: 'translateY(-10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          }
      },
      animatetop: {
        '0%': { top: '-300px', opacity: '0' },
        '100%': { top: '0', opacity: '1' },
      },
      zoomIn: {
        '0%': { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
        '50%': { opacity: '1' },
      },
      animate: {
        '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1', borderRadius: '0' },
        '100%': { transform: 'translateY(-1000px) rotate(720deg)', opacity: '0', borderRadius: '50%' },
      },
      'pulse-icon':{
        '0%':{
              transform: 'scale(1.5)',
              },  
        '70%':{
              transform:' scale(1.8)',        
              },
        '100%': {
              transform: 'scale(1.5)'
              }
      },
      
      },
      animation:{
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'pulse-icon': 'pulse-icon 2s infinite',
          animatetop: 'animatetop 1s',
          zoomIn: 'zoomIn 1s',
          animate: 'animate 25s linear infinite',
      },
      
    },
    backgroundImage: {
      'gradient-bg': 'linear-gradient(to left, #111827, #030712)',
    },
    
  },
  extend: {
    spacing: {
      'animation-delay': 'animation-delay',
      'animation-duration': 'animation-duration',
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.animate-delay-0': { animationDelay: '0s' },
        '.animate-delay-2': { animationDelay: '2s' },
        '.animate-delay-3': { animationDelay: '3s' },
        '.animate-delay-4': { animationDelay: '4s' },
        '.animate-delay-7': { animationDelay: '7s' },
        '.animate-delay-15': { animationDelay: '15s' },
        '.animate-duration-12': { animationDuration: '12s' },
        '.animate-duration-18': { animationDuration: '18s' },
        '.animate-duration-35': { animationDuration: '35s' },
        '.animate-duration-45': { animationDuration: '45s' },
        '.animate-duration-11': { animationDuration: '11s' },
      });
    })
  ],
}
export default config
