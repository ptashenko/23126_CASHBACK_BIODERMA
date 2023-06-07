module.exports = {
  ignorePatterns: [],
  extends: [
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'func-call-spacing': ['error', 'never'],
    'no-tabs': 0,
    'max-len': [
      'error',
      {
        code: 180,
        tabWidth: 2,
        comments: 180,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'import/first': 'off',
    camelcase: 0,
    /* VUE ESLINT RULES */
    'vue/no-v-text-v-html-on-component': 'warn',
    'vue/script-setup-uses-vars': 'error',
    'vue/valid-template-root': 0,
    'vue/no-multiple-template-root': 0,
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/multi-word-component-names': ['error', {
      ignores: ['404', 'faq', 'account', 'confirm', 'cookies', 'error', 'index', 'default', 'play', 'gioca', 'login', 'registration', 'profile', 'receipts', '[code]'],
    }],
    /* TYPESCRIPT RULES */
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: true,
    }],
  },
}
