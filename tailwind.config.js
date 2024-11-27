/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        auroraBlue: '#59CBE8',
        solarPurple: '#AE67FA',
        quantumCyan: '#41EAD4',
        horizonCoral: '#FF6F61',
        moonlitSilver: '#D9D9E3',
        etherealPink: '#FCE4F3',
        obsidianBlack: '#101820',
        mistGray: '#2C2F33',
        lunarWhite: '#F9FAFB',
        hyperLime: '#D4FF4F',
        crimsonGlare: '#FF3D5A'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'glow': {
          '0%': { 'box-shadow': '0 0 20px #59CBE8' },
          '100%': { 'box-shadow': '0 0 30px #AE67FA' }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#D9D9E3',
            h1: {
              color: '#AE67FA',
            },
            h2: {
              color: '#59CBE8',
            },
            h3: {
              color: '#41EAD4',
            },
            strong: {
              color: '#FCE4F3',
            },
            a: {
              color: '#59CBE8',
              '&:hover': {
                color: '#AE67FA',
              },
            },
          },
        },
      },
      backgroundImage: {
        'aurora-glow': 'linear-gradient(135deg, #59CBE8, #41EAD4, #AE67FA)',
        'cosmic-sunset': 'linear-gradient(90deg, #FF6F61, #FCE4F3, #D9D9E3)',
        'nebula-edge': 'linear-gradient(180deg, #101820, #41EAD4, #D4FF4F)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}