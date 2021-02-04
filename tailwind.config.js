module.exports = {
  purge: ['./public/*.html', './public/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
