import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  // @ts-ignore — daisyUI extends tailwind config at runtime
  daisyui: {
    themes: ['light', 'dark', 'sunset'],
  },
};

export default config;
