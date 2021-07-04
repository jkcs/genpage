const { smartOutputFile } = require('../../util/build/fs')
const { emptyDirSync } = require('fs-extra')
const { copy, existsSync } = require('fs-extra')
const { SRC_DIR, LIB_DIR, ES_DIR, ES_ENTRY, STYLE_DIR, ENTRY, WEBPACK_CONFIG_FILE } = require('../../util/build/constant')
const { compileStyle, polymerizationStyle } = require('../../compiler/compile-style')
const { compileTs } = require('../../compiler/compile-ts')
const { isStyle, isNeedImportStyle, isUtils, isMixins, isScript } = require('../../util/build/index')
const { getFiles, isDir } = require('../../util/build/fs')
const { join } = require('path')
const chalk = require('chalk')
const buildAllComponentsJs = require('../../compiler/build-all-component-js')

const compile = async (dir, styles, isES) => {
    const files = getFiles(dir)

    return await Promise.all(files
      .map(filename => {
        const filePath = join(dir, filename)

        if (isDir(filePath)) {
          return compile(filePath, styles, isES)
        }

        if (isStyle(filePath)) {
          if (isNeedImportStyle(filePath)) {
            styles(filePath)
          }
          return compileStyle(filePath);
        }

        if (
          isUtils(filePath)
          || isMixins(filePath)
          || (isES && isScript(filePath))
        ) {
          return compileTs(filePath, isES ? 'esnext' : 'commonjs')
        }

        // Keep the source code
        // return remove(filePath)
      })
    )
}

const outPutIndexCss = async (dir, styles) => {
  const styleExt = ['less', 'scss', 'css']
    .find(ext => existsSync(join(STYLE_DIR, `index.${ext}`)))

  const stylePath = join(dir, `index.${styleExt}`)

  smartOutputFile(
    join(dir, `index.${styleExt}`),
    styles
  )

  return compileStyle(stylePath)
}

const buildComponents = async (dir, isES) => {
  emptyDirSync(dir)
  await copy(SRC_DIR, dir)

  const styles = polymerizationStyle(dir)
  await compile(dir, styles, isES)

  await outPutIndexCss(dir, styles().join(''))

  smartOutputFile(
    join(dir, 'index.js'),
    buildAllComponentsJs()
  )
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
    usage: 'vue-cli-service genpage-build-lib [options]',
    options: {
      '--watch': 'watch build on change',
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

    if (args.watch) {
      console.info(chalk.yellowBright('Watching file changes...'))
      const chokidar = require('chokidar')
      chokidar.watch(SRC_DIR).on('change', async (path) => {
        try {
          await build(args, api, options)
        } catch (err) {
          console.fail('Compile failed: ' + path)
          console.log(err)
        }
      })
    }

    delete process.env.VUE_CLI_BUILD_TARGET
  })
}

function getWebpackConfig (api, args, options) {
  const validateWebpackConfig = require('@vue/cli-service/lib/util/validateWebpackConfig')
  const customWebpack = require(WEBPACK_CONFIG_FILE)
  const webpackConfig = Object.assign(api.resolveWebpackConfig(), customWebpack)

  // No modification allowed
  options.outputDir = customWebpack.output.path
  // check for common config errors
  validateWebpackConfig(webpackConfig, api, options, 'lib')

  if (args.watch) {
    modifyConfig(webpackConfig, config => {
      config.optimization = {
        minimize: false
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
    await buildComponents(LIB_DIR)
    await buildComponents(ES_DIR, true)

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
