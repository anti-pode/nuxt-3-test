import { Nitro } from 'nitropack';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL,
      isProdMode: process.env.NODE_ENV === 'production',

      user: {
        id: process.env.USER_ID,
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
      },
    },
  },

  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },

  css: ['@/app/styles/global.scss'],
});
