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

  // if (isTSX(filePath)) {
  //   try {
  //     const { code } = await transformAsync(jsCode, {
  //       filename: filePath,
  //       configFile: false, // config just this
  //       presets: [
  //         [
  //           require.resolve('@babel/preset-env'),
  //           {
  //             // modules: !isModule,
  //             // modules: isModule ? 'commonjs' : false,
  //             modules: 'commonjs',
  //             loose: true
  //           },
  //         ],
  //         require.resolve('@babel/preset-typescript'),
  //       ],
  //       plugins: [
  //         [
  //           require.resolve('@vue/babel-plugin-jsx'),
  //           {
  //             enableObjectSlots: false
  //           }
  //         ]
  //       ]
  //     })
  //
  //     removeSync(filePath)
  //     smartOutputFile(replaceExt(filePath, '.js'), code)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // } else {
  //
  //   removeSync(filePath)
  //   smartOutputFile(replaceExt(filePath, '.js'), jsCode)
  // }
}
