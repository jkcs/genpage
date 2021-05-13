module.exports = (api, options, rootOptions) => {
  const mainVersion = require('./package.json').version
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      scripts: {
        serve: 'vue-cli-service genpage-serve',
        build: 'vue-cli-service genpage-build'
      },
      devDependencies: {
        jest: '^25.5.4'
      },
      browserslist: [
        'Android >= 4',
        'ios >= 8'
      ]
    }
  })
}
