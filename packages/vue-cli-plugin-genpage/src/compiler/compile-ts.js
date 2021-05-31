const { smartOutputFile } = require('../util/build/fs')
const ts = require('typescript')
const fs = require('fs-extra')

module.exports.compileTs = async function (filePath) {
  const tsCode = fs.readFileSync(filePath)
  const jsCode = ts.transpile(
    String(tsCode),
    {
      target: ts.ScriptTarget.ES5,
      module: 'commonjs',
      jsx: ts.JsxEmit.Preserve,
      noLib: false,
      importHelpers: false
    }
  )

  smartOutputFile(filePath.replace('.ts', '.js'), jsCode)
}
