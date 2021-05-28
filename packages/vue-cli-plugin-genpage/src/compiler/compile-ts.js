const { transformFile } = require('@babel/core')
const presetTypescript = require('@babel/preset-typescript')
const presetEnv = require('@babel/preset-env')
const { smartOutputFile } = require('../util/build/fs')
const ts = require('typescript')
const fs = require('fs-extra')

module.exports.compileTs = async function (filePath) {
  console.log(filePath)
  // if (filePath.indexOf('.d.ts') === -1) {
  //   const tsCode = fs.readFileSync(filePath)
  //   console.log(
  //     ts.transpile(tsCode, {
  //       target: ts.ScriptTarget.ES2015,
  //       module: 'commonjs',
  //       jsx: ts.JsxEmit.Preserve,
  //       noLib: false,
  //       importHelpers: false
  //     })
  //   )
  // }

  transformFile(
			filePath,
			{
				minified: false,
        presets: [presetTypescript],
        targets: {
          esmodules: true
        }
			},
			(err, babelFileResult) => {
				if (err) {
					console.error(err)
					return
				}

				smartOutputFile(filePath.replace('.ts', '.js'), babelFileResult.code)
			}
    )
}
