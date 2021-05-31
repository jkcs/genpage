const { buildLib, buildComponent } = require('./lib')
const { WEBPACK_CONFIG_FILE } = require('../../util/build/constant')
const customWebpack = require(WEBPACK_CONFIG_FILE)

const modifyConfig = (config, fn) => {
  if (Array.isArray(config)) {
    config.forEach(c => fn(c))
  } else {
    fn(config)
  }
}

module.exports = (api, options) => {
  api.registerCommand('genpage-build-lib', {
    description: 'build for production',
    usage: 'vue-cli-service genpage-build [options]',
    options: {
      '--umd <umdEntryName>': 'build umd release umd entry name default index'
    }
  }, async (args) => {
    process.env.NODE_ENV = 'production'
    process.env.VUE_CLI_BUILD_TARGET = args.target

    api.chainWebpack(webpackConfig => {
      webpackConfig
        .output
        .filename('js/[name].[hash].bundle.js')
        .chunkFilename('js/[name].[hash:8].js')

      webpackConfig
        .plugin('webpackbar')
        .use(require('webpackbar'), [{ name: 'Genpage' }])

      webpackConfig
        .plugins
        .delete('html-index')
        .delete('preload-index')
        .delete('prefetch-index')
        .delete('copy')
        .delete('define')
        .delete('case-sensitive-paths')
        .delete('extract-css')
        .delete('optimize-css')
        .delete('hash-module-ids')
        .delete('named-chunks')

      // Polymerization plugin was be replaced by entry
      // webpackConfig
      //   .plugin('polymerization-components')
      //   .use(require('../../webpack/PolymerizationComponentsPlugin'))
    })

    await build(args, api, options)

    delete process.env.VUE_CLI_BUILD_TARGET
  })
}

function getWebpackConfig (api, args, options) {
  const validateWebpackConfig = require('@vue/cli-service/lib/util/validateWebpackConfig')
  const webpackConfig = Object.assign(api.resolveWebpackConfig(), customWebpack)

  // No modification allowed
  options.outputDir = customWebpack.output.path
  // check for common config errors
  validateWebpackConfig(webpackConfig, api, options, 'lib')

  if (args.umd) {
    const entryName = typeof args.umd === 'string'
      ? args.umd
      : 'index'
    const entryNameMin = `${entryName}.min`
    const TerserWebpackPlugin = require('terser-webpack-plugin')

    modifyConfig(webpackConfig, config => {
      const entry = config.entry.index
      config.entry = {
        [entryName]: entry,
        [entryNameMin]: entry
      }

      config.output = {
        ...config.output,
        filename: '[name].js',
        libraryTarget: 'umd'
      }

      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserWebpackPlugin({
            include: /min/
          })
        ]
      }
    })
  }

  return webpackConfig
}

async function build (args, api, options) {
  const webpack = require('webpack')

  const {
    log,
    done
  } = require('@vue/cli-shared-utils')

  options.productionSourceMap = !!args['source-map']

  log()

  const webpackConfig = getWebpackConfig(api, args, options)

  return new Promise(async (resolve, reject) => {
    await buildComponent()
    console.log(webpackConfig)

    webpack(webpackConfig, async (err, stats) => {
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        /* eslint-disable prefer-promise-reject-errors */
        return reject('Build failed with errors.')
      }

      done(`Build complete. `)

      resolve()
    })
  })
}

module.exports.defaultModes = {
  build: process.env.NODE_ENV
}
