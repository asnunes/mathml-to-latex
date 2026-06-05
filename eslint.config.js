const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  { ignores: ['dist', 'coverage'] },
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      // Bake the AGENTS.md convention: keep private methods below public ones.
      '@typescript-eslint/member-ordering': ['error', { default: ['public-method', 'private-method'] }],
    },
  },
);
