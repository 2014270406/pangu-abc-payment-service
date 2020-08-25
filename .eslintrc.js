module.exports = {
    parser:  '@typescript-eslint/parser',
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    plugins: ['@typescript-eslint', 'spellcheck'],
    env:{
        browser: true,
        node: true,
        es6: true,
        mocha: true,
    },
    rules: {
        'camelcase': ['error', {'properties': 'always'}],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
            "multiline": {
                "delimiter": "comma",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "comma",
                "requireLast": true
            },
            "overrides": {
                "interface": {
                    "multiline": {
                        "delimiter": "semi",
                        "requireLast": true
                    }
                }
            }
        }],
        'no-implicit-globals': 'error',
        'object-curly-spacing': ['error', 'always'],
        'no-console': 'off',
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "spellcheck/spell-checker": [1,
            {
                "comments": true,
                "strings": true,
                "identifiers": true,
                "lang": "en_US",
                "skipWords": [
                    "Redis",
                    "utils",
                    "uuid",
                    "redis",
                    "setex",
                    "timestamp",
                    "filename",
                    "ctx",
                    "minglian",
                    "decrement",
                    "gracefulshutdown",
                    "auth",
                    "api",
                    "mysql",
                    "dir",
                    "init",
                    "iflp",
                    "multipart"
                ],
                "skipIfMatch": [
                    "[A-Z]*"
                ],
                "minLength": 3
            }
        ]
    }
};
