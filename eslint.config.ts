export default defineConfig(
  {
    // Конфигурация для JS
    overrides: [
      {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
          globals: globals.browser,
        },
      },
    ],
  },
  {
    // Конфигурация для TS
    overrides: [
      {
        files: ["**/*.{ts,mts,cts}"],
        parser: "@typescript-eslint/parser",
        plugins: {
          "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        extends: ["plugin:@typescript-eslint/recommended"],
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: "module",
        },
      },
    ],
  }
);