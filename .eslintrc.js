module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    ecmaVersion: 6,
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "promise"],
  reportUnusedDisableDirectives: true,
  rules: {
    eqeqeq: ["warn", "smart"],
    "require-await": ["warn"],
    // Note: you must disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn",
  },
};
