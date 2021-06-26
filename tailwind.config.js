module.exports = {
  mode: "jit",
  purge: {
    content: ["./resources/**/*.{blade.php,js,jsx}"],
    options: {
      blocklist: ["./resources/js/components/*.js"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
