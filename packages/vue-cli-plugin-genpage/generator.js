module.exports = (api, options, rootOptions) => {
  const mainVersion = require('./package.json').version
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      scripts: {
        serve: 'vue-cli-service genpage-serve',
        build: 'vue-cli-service genpage-build',
        'test:unit': 'vue-cli-service test:unit',
        lint: 'vue-cli-service lint'
      },
      devDependencies: {
        '@genpage/vue-cli-plugin-genpage': "^1.0.0"
      },
      browserslist: [
        'Android >= 4',
        'ios >= 8'
      ]
    }
  })
}
