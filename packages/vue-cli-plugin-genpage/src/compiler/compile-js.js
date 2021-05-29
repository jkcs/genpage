const { smartOutputFile } = require('../util/build/fs')
const { transformFile } = require('@babel/core')
const path = require('path')

module.exports.compileJs = async function (filePath) {
  transformFile(
    filePath,
    {
      cwd: path.resolve(__dirname, '../../'),
      minified: false,
      targets: {
        esmodules: false
      },
      presets: [
        '@babel/preset-env'
      ]
    },
    (err, babelFileResult) => {
      if (err) {
        console.error(err)
        return
      }

      smartOutputFile(filePath, babelFileResult.code)
    }
  )
}
