const { transformAsync } = require('@babel/core')
const { smartOutputFile } = require('../util/build/fs')
const { replaceExt } = require('../util/build')
const fs = require('fs-extra')

module.exports.compileTsx = async function (filePath, isModule) {
  const tsxCode = fs.readFileSync(filePath)
  try {
      const { code } = await transformAsync(tsxCode, {
        filename: filePath,
        configFile: false, // config just this
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              modules: !isModule ? 'commonjs' : false,
              loose: true
            },
          ],
          require.resolve('@babel/preset-typescript'),
        ],
        plugins: [
          [
            require.resolve('@vue/babel-plugin-jsx'),
            {
              enableObjectSlots: false
            }
          ]
        ]
      })

      smartOutputFile(replaceExt(filePath, '.js'), code)
    } catch (e) {
      console.log('Compile TSX failed: ' + filePath)
      console.log(e)
    }
}
