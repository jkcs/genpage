const { transformAsync } = require('@babel/core')
const { smartOutputFile } = require('../util/build/fs')
const { replaceExt, isTSX } = require('../util/build')
const { removeSync } = require('fs-extra')
const ts = require('typescript')
const fs = require('fs-extra')

module.exports.compileTs = async function (filePath, module) {
  const tsCode = fs.readFileSync(filePath)
  const jsCode = ts.transpile(
    String(tsCode),
    {
      target: ts.ScriptTarget.ES5,
      module: module || 'commonjs',
      jsx: ts.JsxEmit.Preserve,
      noLib: false,
      importHelpers: false
    }
  )

  if (isTSX(filePath)) {
    try {
      const { code } = await transformAsync(jsCode, {
        filename: filePath,
        configFile: false, // config just this
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              modules: false,
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

      removeSync(filePath)
      smartOutputFile(replaceExt(filePath, '.js'), code)
    } catch (e) {
      console.error(e)
    }
  } else {

    removeSync(filePath)
    smartOutputFile(replaceExt(filePath, '.js'), jsCode)
  }
}
