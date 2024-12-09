import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mplus1p)', 'sans-serif'],
      },
    },
  },
  plugins: [typography, daisyui],

  daisyui: {
    themes: [
      {
        aiquiz: {
          primary: '#f29f05',
          'primary-content': '#fdf6e8',
          secondary: '#00b200',
          accent: '#00b3ff',
          neutral: '#13191b',
          'base-100': '#fefcf7',
          info: '#0050f6',
          success: '#32ca00',
          warning: '#f17800',
          error: '#d92b04',
        },
      },
    ],
    logs: false,
  },
};
export default config;
