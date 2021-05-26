const { transformFile } = require('babel-core')
const { smartOutputFile } = require('../util/build')

module.exports.compileTs = async function (filePath) {
		console.log(filePath)
    transformFile(
			filePath,
			{
				minified: false,
				extensions: '.ts'
			},
			(err, babelFileResult) => {
				if (err) {
					console.error(err)
					return
				}
				console.log(babelFileResult)

				smartOutputFile(filePath.replace('.ts', '.js'), babelFileResult.code)
			}
    )
}