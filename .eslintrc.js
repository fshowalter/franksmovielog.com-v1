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
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "prettier", "react-hooks"],
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
      },
    },
  ],
};
