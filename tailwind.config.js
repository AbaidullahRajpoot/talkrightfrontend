import tailwindcssLogical from 'tailwindcss-logical'

import customPlugin from './src/@core/tailwind/plugin'

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [tailwindcssLogical, customPlugin],
  theme: {
    extend: {}
  }
}

export default config
