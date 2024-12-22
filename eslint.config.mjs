import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],

    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },

    settings: {
      'import/resolver': {
        typescript: {}, // Ensure ESLint can resolve TypeScript paths
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },

    rules: {
      ...pluginJs.configs.recommended.rules, // Base ESLint recommended rules
      ...tseslint.configs.recommended.rules, // TypeScript-specific recommended rules
      'prettier/prettier': 'warn',
      // "semi": ["error", "always"], // Require semicolons
      // "quotes": ["error", "single"], // Use single quotes
      // "@typescript-eslint/no-unused-vars": ["warn"], // Warn about unused vars
    },

    ignores: [
      'node_modules/', // Ignore dependencies
      'dist/', // Ignore build outputs
    ],
  },
  {
    settings: {
      prettier: eslintPrettier,
    },
  },
];
