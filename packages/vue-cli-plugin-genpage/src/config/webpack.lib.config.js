const TerserWebpackPlugin = require('terser-webpack-plugin')
const { ENTRY, LIB_DIR } = require('../util/build/constant')

module.exports = (name) => ({
  entry: {
    [name]: ENTRY,
    [`${name}.min`]: ENTRY
  },
  output: {
    path: LIB_DIR,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: name,
    umdNamedDefine: true,
    // https://github.com/webpack/webpack/issues/6522
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  optimization: {
    // minimize: false,
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        include: /min/
      })
    ]
  },
  externals: {
    vue: 'vue'
  }
})
