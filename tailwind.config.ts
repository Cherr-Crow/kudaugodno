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
      white: 'var(--white)',
      black: 'var(--black)',
      grey: 'var(--grey)',
      'green-primary': 'var(--green-primary)',
      'green-secondary': 'var(--green-secondary)',
      'green-tetriary': 'var(--green-tetriary)',
      'green-bold': 'var(--green-bold)',
      'blue-extra-light': 'var(--blue-extra-light)',
      'blue-light': 'var(--blue-light)',
      'blue-primary': 'var(--blue-primary)',
      'blue-secondary': 'var(--blue-secondary)',
      'blue-tetriary': 'var(--blue-tetriary)',
      'blue-bold': 'var(--blue-bold)',
      'red-primary': 'var(--red-primary)',
      'red-secondary': 'var(--red-secondary)',
      'yellow-primary': 'var(--yellow-primary)',
    },
  },
  plugins: [],
} satisfies Config;
