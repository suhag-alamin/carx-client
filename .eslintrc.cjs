module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-unused-expressions": "error",
    "no-console": "warn",
    "no-undef": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
