import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://babaafrid.github.io/klfocus/',
  base: '/klfocus/',
  output: 'static',
  build: {
    format: 'directory',
    assets: 'assets'
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ]
});
