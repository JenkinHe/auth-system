module.exports = {
    env: {
      node: true,
      es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended" // makes ESLint play nicely with Prettier
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      // add custom rules here
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  };
  