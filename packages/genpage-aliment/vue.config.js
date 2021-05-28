const path = require('path')

module.exports = {
  lintOnSave: false,
  outputDir: './lib',
  pages: {
    index: {
      entry: 'demo/main'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'genpage-aliment': path.resolve(__dirname, 'src'),
        '@demo': path.resolve(__dirname, 'demo')
      }
    }
  }
}
