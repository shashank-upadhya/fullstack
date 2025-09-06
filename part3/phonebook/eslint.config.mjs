import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylistic,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/eol-last': ['error', 'always'],      

      eqeqeq: 'error',
        'no-unused-vars': 'off',

      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
