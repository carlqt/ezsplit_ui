// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...[stylistic.configs['recommended-flat']],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    ignores: ['dist/*', 'codegen.ts', 'eslint.config.mjs', 'src/__generated__/*'],
  },

  // ESLINT Rules
  {
    rules: {
      "sort-keys": "error",
    }
  },

  // stylistic rules
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/max-statements-per-line': ['error', { max: 2 }],
    }
  },

  // react-refresh rules
  {
    plugins: {
      'react-refresh': reactRefresh, 
    },
    rules: {
      'react-refresh/only-export-components': 'warn'
    }
  },
);
