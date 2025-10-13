const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');

module.exports = [
    {
        ignores: [
            '.idea/',
            '.vs/',
            '.vscode/',
            'logs/',
            '*.log',
            'node_modules/',
            '*.pem',
            'keys/',
            '!keys/*.md',
            '!keys/*.example',
            'build/',
            'dist/',
            'out/',
            'coverage/',
            '*.env',
            '*.env.test',
            '*.env copy',
            '!.env.example',
            'temp/',
            '.DS_Store',
            '*.save',
            '*.save.*',
            '.jest/',
        ],
    },

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            'no-console': 'off',
            'prettier/prettier': [
                'warn',
                {
                    semi: true,
                    singleQuote: true,
                    tabWidth: 4,
                    trailingComma: 'all',
                    printWidth: 100,
                    endOfLine: 'auto',
                },
            ],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                },
            ],
        },
    },
];
