module.exports = {
  printWidth: 100,
  semi: true,
  vueIndentScriptAndStyle: true,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '.*rc',
      options: {
        parser: 'json',
      },
    },
  ],
};
