module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    //"next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react/recommended",
    "plugin:promise/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "promise"],
  reportUnusedDisableDirectives: true,
  rules: {
    eqeqeq: ["warn", "smart"],

    // Note: you must disable the base rule as it can report incorrect errors
    "require-await": "off",
    "@typescript-eslint/require-await": "error",

    // Note: you must disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "prefer-const": ["warn", { destructuring: "all" }],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
