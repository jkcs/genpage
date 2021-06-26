const { SRC_DIR } = require('../util/build/constant')
const { generateComponentEntry } = require('../util/build/fs')
const fs = require('fs')
const path = require('path')
const { ENTRY, LIB_DIR } = require('../util/build/constant')

const components = generateComponentEntry()
const utilsList = fs.readdirSync(path.resolve(SRC_DIR, './utils'))
const mixinsList = fs.readdirSync(path.resolve(SRC_DIR, './mixins'))
const externals = {
  vue: 'vue'
}

Object.keys(components).forEach(function (key) {
  externals[`@/${key}`] = `@genpage/aliment/lib/${key}`
})

externals[`@/utils`] = `@genpage/aliment/lib/utils`
utilsList.forEach(function (file) {
  file = path.basename(file, path.extname(file))
  externals[`@/utils/${file}`] = `@genpage/aliment/lib/utils/${file}`
})

externals[`@/mixins`] = `@genpage/aliment/lib/mixins`
mixinsList.forEach(function (file) {
  file = path.basename(file, path.extname(file))
  externals[`@/mixins/${file}`] = `@genpage/aliment/lib/mixins/${file}`
})


module.exports = {
  entry: {
    ...components,
    index: ENTRY
  },
  output: {
    path: LIB_DIR,
    filename: (pathData) => {
      return pathData.chunk.name.indexOf('index') > -1
        ? '[name].js'
        : '[name]/index.js'
    },
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: false
  },
  externals
}
