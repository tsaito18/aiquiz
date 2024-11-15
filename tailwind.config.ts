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
        sans: ['var(--font-mplus1p)'],
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    logs: false,
  },
};
export default config;
