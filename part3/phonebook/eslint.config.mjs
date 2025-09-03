// import globals from 'globals'
// import js from '@eslint/js'
// import stylisticJs from '@stylistic/eslint-plugin-js'

// export default [
//   js.configs.recommended,
//   {
//     files: ['**/*.js'],
//     languageOptions: {
//       sourceType: 'commonjs',
//       globals: { ...globals.node },
//       ecmaVersion: 'latest',
//     },
//     plugins: {
//       '@stylistic/js': stylisticJs,
//     },
//     rules: {
//       // stylistic rules
//       '@stylistic/js/indent': ['error', 2],
//       '@stylistic/js/linebreak-style': ['error', 'unix'],
//       '@stylistic/js/quotes': ['error', 'single'],
//       '@stylistic/js/semi': ['error', 'never'],

//       // best practices
//       eqeqeq: 'error',
//       'no-trailing-spaces': 'error',
//       'object-curly-spacing': ['error', 'always'],
//       'arrow-spacing': ['error', { before: true, after: true }],

//       // allow console for Node apps
//       'no-console': 'off',
//     },
//   },
//   {
//     ignores: ['dist/**'],
//   },
// ]


import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

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
      '@stylistic/js': stylisticJs,
    },
    rules: {
      // stylistic rules (Full Stack Open style)
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/eol-last': ['error', 'always'],      

      // best practices
      eqeqeq: 'error',
        'no-unused-vars': 'off',

      // allow console for debugging
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
