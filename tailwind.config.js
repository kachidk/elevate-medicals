module.exports = {
  purge: {
    content: [
     './resources/**/*.blade.php',
     './resources/**/*.js',
     './resources/**/*.vue',
    ],
     options: {
        blocklist: [
          './resources/js/components/*.js'
        ]
     }
    },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
