module.exports = {
  parser: 'vue-eslint-parser',

  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],

  rules: {
    'vue/max-attributes-per-line': [0], // отключить максимальное количество атрибутов в одну строку
    'max-len': [0], // максимальная длина строки в 120 символов
  },

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  overrides: [
    {
      files: ['pages/**/index.vue'],
      rules: {
        'vue/multi-word-component-names': 0, // отключить правило для index.vue файлов
      },
    },
  ],
};
