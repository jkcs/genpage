const { smartOutputFile } = require('../util/build/fs')
const { transformFile } = require('@babel/core')

module.exports.compileJs = async function (filePath) {
  transformFile(
    filePath,
    {
      minified: false,
      targets: {
        esmodules: true
      }
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
