module.exports = {
  root: true,
  extends: [
    "universe/native",
    "plugin:prettier/recommended", // Uses eslint-plugin-prettier and eslint-config-prettier
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
  },
};
