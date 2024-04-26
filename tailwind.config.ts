import type { Config } from 'tailwindcss'

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
          },

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
      }
    },
  },
  plugins: [],
}
export default config
