const path = require('path')
const { buildLib, buildComponent } = require('./lib')
const { getFiles, isDir, generateComponentEnter } = require('../../util/build/fs')
const { LIB_DIR, ENTRY } = require('../../util/build')
const customWebpack = require('../../config/webpack.config')

const defaults = {
  clean: true,
  target: 'app',
  'unsafe-inline': true
}

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
      '--watch': 'watch for changes',
      '--minimize': 'Tell webpack to minimize the bundle using the TerserPlugin.',
      '--report': `generate report.html to help analyze bundle content`,
      '--report-json': 'generate report.json to help analyze bundle content',
      '--source-map': 'generate source map to help analyze code'
    }
  }, async (args) => {
    for (const key in defaults) {
      if (args[key] == null) {
        args[key] = defaults[key]
      }
    }
    args.entry = args.entry || args._[0]

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

      // webpackConfig
      //   .plugin('polymerization-components')
      //   .use(require('../../webpack/PolymerizationComponentsPlugin'))

      console.log(Object.keys(webpackConfig.plugins.entries()))
    })

    await build(args, api, options)

    delete process.env.VUE_CLI_BUILD_TARGET
  })
}

function getWebpackConfig (api, args, options) {
  const validateWebpackConfig = require('@vue/cli-service/lib/util/validateWebpackConfig')
  // resolve raw webpack config
  // const webpackConfig = require('@vue/cli-service/lib/commands/build/resolveAppConfig')(api, args, options)
  const webpackConfig = Object.assign(api.resolveWebpackConfig(), customWebpack)
  webpackConfig.entry = generateComponentEnter()
  webpackConfig.entry.index = ENTRY

  // check for common config errors
  validateWebpackConfig(webpackConfig, api, options, args.target)



  webpackConfig.output = {
    path: LIB_DIR,
    filename: (pathData) => pathData.chunk.name === 'index' ? '[name].js' : '[name]/index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  }

  webpackConfig.externals = {
    ...webpackConfig.externals,
    vue: 'vue',
    'vue-class-component': 'vue-class-component',
    'vue-property-decorator': 'vue-property-decorator',
  }
  webpackConfig.optimization = {
    minimize: false
  }

  if (args.watch) {
    modifyConfig(webpackConfig, config => {
      config.watch = true
    })
  }

  if (args.report || args['report-json']) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    modifyConfig(webpackConfig, config => {
      const bundleName = args.target !== 'app'
        ? config.output.filename.replace(/\.js$/, '-')
        : ''
      config.plugins.push(new BundleAnalyzerPlugin({
        logLevel: 'warn',
        openAnalyzer: false,
        analyzerMode: args.report ? 'static' : 'disabled',
        reportFilename: `${bundleName}report.html`,
        statsFilename: `${bundleName}report.json`,
        generateStatsFile: !!args['report-json']
      }))
    })
  }

  // Expose advanced stats
  if (args.dashboard) {
    const DashboardPlugin = require('../../webpack/DashboardPlugin')
    modifyConfig(webpackConfig, config => {
      config.plugins.push(new DashboardPlugin({
        type: 'build',
        moduleBuild: args.moduleBuild,
        keepAlive: args.keepAlive
      }))
    })
  }

  if (args.minimize && process.env.NODE_ENV !== 'production') {
    modifyConfig(webpackConfig, config => {
      config.optimization.minimize = true
      config.optimization.namedModules = false
    })
  } else {
    modifyConfig(webpackConfig, config => {
      if (!config.optimization) {
        config.optimization = {}
      }
      config.optimization.namedModules = false
    })
  }
  return webpackConfig
}

async function build (args, api, options) {
  const fs = require('fs-extra')
  const chalk = require('chalk')
  const webpack = require('webpack')

  const {
    log,
    done
  } = require('@vue/cli-shared-utils')

  options.productionSourceMap = !!args['source-map']

  log()

  const targetDir = api.resolve(options.outputDir)

  const webpackConfig = getWebpackConfig(api, args, options)

  if (process.env.NODE_ENV === 'production') {
    try {
      fs.emptyDirSync(path.resolve(api.service.context, targetDir))
    } catch (e) {
      console.warn(e)
    }
  }

  return new Promise(async (resolve, reject) => {
    await buildLib()
    await buildComponent()
    console.log(webpackConfig)

    /* const webpackConfig2 = {
      mode: 'production',
      entry: generateComponentEnter(),
      output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: '[name]/[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
        alias: {

        },
        modules: ['node_modules']
      },
      externals: {
        vue: 'vue'
      },
      performance: {
        hints: false
      },
      stats: 'none',
      optimization: {
        minimize: false
      },
      module: {
        rules: [
          {
            test: /\.(jsx?|babel|es6)$/,
            include: process.cwd(),
            exclude:  /node_modules|utils\/popper\.js|utils\/date\.js/,
            loader: 'babel-loader'
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
          },
          {
            test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('static', '[name].[hash:7].[ext]')
            }
          }
        ]
      },
      plugins: [
        // new ProgressBarPlugin(),
        new VueLoaderPlugin()
      ]
    } */

    webpack(webpackConfig, async (err, stats) => {
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        /* eslint-disable prefer-promise-reject-errors */
        return reject('Build failed with errors.')
      }

      const targetDirShort = path.relative(
        api.service.context,
        targetDir
      )

      if (!args.watch) {
        const dirMsg = `The ${chalk.cyan(targetDirShort)} directory is ready to be deployed.`
        done(`Build complete. ${dirMsg}`)
      } else {
        const dirMsg = `The ${chalk.cyan(targetDirShort)} directory is ready. `
        done(`Build complete. ${dirMsg}Watching for changes...`)
      }

      resolve()
    })
  })
}

module.exports.defaultModes = {
  'uni-build': process.env.NODE_ENV
}
