module.exports = {
     parser: "@typesScript-eslint/parser",
     extends: [
         'plugin:@typescript-eslint/recommended',
         'prettier/@typesScript-eslint',
         'plugin:prettier/recommended',
     ],
     parseOptions: {
         ecmaVersion:2018,
         sourceType: 'module',
     },
     rules: {},
 }