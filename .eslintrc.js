module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    complexity: ["error"],
    "max-lines": ["error", 375],
    "max-depth": ["error"],
    "max-params": ["error", 4],
    "max-nested-callbacks": ["error"],
    "max-statements": ["error", 25],
    "max-lines-per-function": ["error", 120],
  },
  overrides: [
    {
      files: ["*.ts", "**/*.ts", "**/*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "prettier", "react-hooks", "import"],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: ["tsconfig.json"],
      },
      settings: {
        react: {
          version: "detect",
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: ["tsconfig.json"],
          },
          node: true,
        },
      },
    },
    {
      files: ["**/*.spec.ts", "**/*.spec.tsx"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "max-lines-per-function": ["off"],
      },
    },
  ],
};
