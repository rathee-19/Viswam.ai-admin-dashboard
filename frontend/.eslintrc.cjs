module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // Disable unused-vars checking for TypeScript
    '@typescript-eslint/no-empty-interface': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
