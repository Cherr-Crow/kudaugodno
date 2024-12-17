import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: 'var(--white)',
      'white-secondary': 'var(--white-secondary)',
      black: 'var(--black)',
      'grey-100': 'var(--grey-100)',
      'grey-primary': 'var(--grey-primary)',
      'grey-secondary': 'var(--grey-secondary)',
      'grey-600': 'var(--grey-600)',
      'green-primary': 'var(--green-primary)',
      'green-secondary': 'var(--green-secondary)',
      'green-tetriary': 'var(--green-tetriary)',
      'green-bold': 'var(--green-bold)',
      'blue-disabled': 'var(--blue-disabled)',
      'blue-extra-light': 'var(--blue-extra-light)',
      'blue-light': 'var(--blue-light)',
      'blue-primary': 'var(--blue-primary)',
      'blue-secondary': 'var(--blue-secondary)',
      'blue-tetriary': 'var(--blue-tetriary)',
      'blue-300': 'var(--blue-300)',
      'blue-500': 'var(--blue-500)',
      'blue-600': 'var(--blue-600)',
      'blue-900': 'var(--blue-900)',
      'blue-bold': 'var(--blue-bold)',
      'red-primary': 'var(--red-primary)',
      'red-secondary': 'var(--red-secondary)',
      'yellow-primary': 'var(--yellow-primary)',
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active', 'disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
} satisfies Config;
