import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0F',
        surface: '#13131A',
        line: '#25252E',
        muted: '#8B8B96',
        accent: '#00E5A8',
        warn:   '#F5B946',
        danger: '#F06060',
      },
    },
  },
  plugins: [],
};

export default config;
