const {
  resolve
} = require('path');
module.exports = {
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: resolve(__dirname, './tsconfig.json'),
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['import', 'jest', 'prettier', 'jsx-a11y', '@typescript-eslint'],
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:import/recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended', 'plugin:import/warnings', 'plugin:jest/recommended', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'import/order': ['error', {
      groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index', 'object', 'type']
    }],
    'no-restricted-syntax': ['error', {
      // Проверяем, что setTimeout всегда имеет два аргумента
      selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
      message: 'setTimeout must always be invoked with two arguments.'
    }],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_'
    }],
    'react/jsx-no-useless-fragment': ['error', {
      allowExpressions: true
    }],
    'no-restricted-globals': ['error', {
      // Запрещаем писать тесты с test()
      name: 'test',
      message: 'Do not test() function. Use it() instead.'
    }],
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    'import/no-extraneous-dependencies': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'max-len': ['error', {
      code: 100,
      comments: 130,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreTrailingComments: true
    }],
    'react/react-in-jsx-scope': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/no-unused-prop-types': 'error',
    '@typescript-eslint/naming-convention': ['error', {
      selector: ['variable', 'function', 'variableLike'],
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'allow'
    }, {
      selector: 'interface',
      format: ['PascalCase'],
      custom: {
        regex: '^I[A-Za-z]',
        match: true
      }
    }],
    '@typescript-eslint/no-use-before-define': 'warn',
    // TODO
    '@typescript-eslint/ban-types': 'warn',
    'react/function-component-definition': ['warn', {
      namedComponents: 'arrow-function'
    }],
    'react/no-unstable-nested-components': 'warn',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'no-restricted-exports': 'warn',
    'no-underscore-dangle': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'implicit-arrow-linebreak': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'jest/no-conditional-expect': 'off',
    // TODO
    'jest/valid-expect': 'off' // TODO
  }
};