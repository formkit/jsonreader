/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./content/**/*.md"
  ],
  theme: {
    extend: {
      colors: {
        // More stark, higher contrast color palette with iOS-style blue
        'primary': '#000000',
        'secondary': '#111111',
        'accent': '#007AFF', // Bright iOS-style blue
        'gray-50': '#fafafa',
        'gray-100': '#f5f5f5',
        'gray-200': '#e5e5e5',
        'gray-300': '#d4d4d4',
        'gray-400': '#a3a3a3',
        'gray-500': '#737373',
        'gray-600': '#525252',
        'gray-700': '#404040',
        'gray-800': '#262626',
        'gray-900': '#171717',
        'success': '#00C853', // Brighter green
        'error': '#FF3B30', // iOS-style red
        'warning': '#FF9500', // iOS-style orange
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black'),
            a: {
              color: theme('colors.accent'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: theme('colors.black'),
              fontWeight: '400',
              borderRadius: '0.25rem',
              padding: '0.2rem 0.4rem',
              backgroundColor: theme('colors.gray.100'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            h1: {
              color: theme('colors.black'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.black'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.black'),
              fontWeight: '700',
            },
            h4: {
              color: theme('colors.black'),
              fontWeight: '700',
            },
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 