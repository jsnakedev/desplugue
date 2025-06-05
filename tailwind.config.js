/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0fe',
          200: '#bae0fd',
          300: '#7dc6fa',
          400: '#38a8f5',
          500: '#0e8eea',
          600: '#0272c9',
          700: '#0259a2',
          800: '#064a85',
          900: '#0c406f',
          950: '#082a4a',
        },
        secondary: {
          50: '#f6f7f9',
          100: '#eceef3',
          200: '#d5dbe5',
          300: '#b3bdd0',
          400: '#8a99b6',
          500: '#6a7d9f',
          600: '#536585',
          700: '#45536c',
          800: '#3b475b',
          900: '#343d4e',
          950: '#21273a',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e6e6e6',
          300: '#d1d1d1',
          400: '#ababab',
          500: '#8d8d8d',
          600: '#6d6d6d',
          700: '#5d5d5d',
          800: '#4f4f4f',
          900: '#434343',
          950: '#262626',
        },
        surface: {
          light: '#F5F5DC',
          dark: '#1A2A40',
        },
        accent: {
          light: '#B6D0E2',
          dark: '#394867',
        },
        background: {
          light: '#FFFFFF',
          dark: '#121212',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
    },
  },
  plugins: [],
};