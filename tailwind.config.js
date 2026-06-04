/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd2ff',
          300: '#8eb5ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1a44f5',
          700: '#1333e1',
          800: '#162cb6',
          900: '#182a8f',
        },
        warm: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#ffd8a8',
          300: '#ffbc70',
          400: '#ff9636',
          500: '#fa7a1a',
          600: '#eb600e',
          700: '#c34a0f',
          800: '#9b3b15',
          900: '#7d3314',
        },
        care: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        cream: '#FFFAF5',
        'blue-gray': {
          50: '#f8fafc',
          100: '#f0f4f8',
          200: '#e2e8f0',
          300: '#cbd5e1',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      fontSize: {
        'display': ['2.75rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'heading': ['1.875rem', { lineHeight: '1.35' }],
        'subheading': ['1.375rem', { lineHeight: '1.5' }],
        'body': ['1.0625rem', { lineHeight: '1.75' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.75' }],
        'card-title': ['1.25rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.10)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
