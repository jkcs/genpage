require('dotenv').config()

const os = require('os')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const sass = require('sass')

const isProduction = process.env.NODE_ENV === 'production'
const extractCSS = isProduction || process.env.TARGET === 'development'

exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4),
})

const cssLoaders = [
  extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader', options: { sourceMap: !isProduction } },
  { loader: 'postcss-loader', options: { sourceMap: !isProduction } }
]

const sassLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: sass,
      sassOptions: {
        indentedSyntax: true,
      },
    },
  },
]

const scssLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: sass,
      sassOptions: {
        indentedSyntax: false,
      },
    },
  },
]

const plugins = [
  new VueLoaderPlugin(),
  new FriendlyErrorsWebpackPlugin({
    clearConsole: false,
    logLevel: 'WARNING',
  }),
]

exports.config = {
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx', '.css', '.sass', '.scss'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: sassLoaders,
      },
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
    ],
  },
  plugins,
  performance: {
    hints: false
  },
  stats: { children: false }
}
