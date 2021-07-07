const { smartOutputFile } = require('../util/build/fs')
const { replaceExt } = require('../util/build')
const ts = require('typescript')
const fs = require('fs-extra')

module.exports.compileTs = async function (filePath, isModule) {
  const tsCode = fs.readFileSync(filePath)
  const jsCode = ts.transpile(
    String(tsCode),
    {
      target: ts.ScriptTarget.ES5,
      module: isModule ? 'esnext' : 'commonjs2',
      jsx: ts.JsxEmit.Preserve,
      noLib: false,
      importHelpers: false
    }
  )

  fs.removeSync(filePath)
  smartOutputFile(replaceExt(filePath, '.js'), jsCode)
}
