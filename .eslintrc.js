module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react/no-unescaped-entities": "off",
    "react-hooks/rules-of-hooks": "off",
    "react/display-name": "off",
    "react/prop-types": "off"
  }
};
