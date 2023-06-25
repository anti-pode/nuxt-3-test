import { Nitro } from 'nitropack';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL,
      isProdMode: process.env.NODE_ENV === 'production',
    },
  },

  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },

  css: ['@/app/styles/global.scss'],
});
