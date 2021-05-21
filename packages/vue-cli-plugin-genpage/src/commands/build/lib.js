const { smartOutputFile } = require('../../util/build/fs')
const { emptyDirSync } = require('fs-extra')
const { copy } = require('fs-extra')
const { SRC_DIR, LIB_DIR } = require('../../util/build/constant')
const { compileStyle, polymerizationStyle } = require('../../compiler/compile-style')
const { isStyle, isNeedImportStyle } = require('../../util/build/index')
const { getFiles, isDir } = require('../../util/build/fs')
const { join } = require('path')

const styles = polymerizationStyle()

const compileFile = (filePath) => {
  /*if (isScript(filePath)) {
    return compileJs(filePath);
  }*/

  if (isStyle(filePath)) {
    if (isNeedImportStyle(filePath)) {
      styles(filePath)
    }
    return compileStyle(filePath);
  }

  // return remove(filePath);
}

module.exports.compileFile = compileFile

const compile = async (dir) => {
  const files = getFiles(dir)
  console.log(files)
  const queue = files
    .map(filename => {
      const filePath = join(dir, filename)

      console.log(filePath)
      if (isDir(filePath)) {
        return compile(filePath)
      }

      return compileFile(filePath)
    })
  const stylePath = join(LIB_DIR, 'index.less')
  console.log(styles())
  queue.push(
    smartOutputFile(
      join(LIB_DIR, 'index.less'),
      styles().join('')
    )
  )
  queue.push(
    compileFile(stylePath)
  )
  await Promise.all(queue)
}
module.exports.compile = compile

module.exports.buildLib = async () => {
  emptyDirSync(LIB_DIR)
  await copy(SRC_DIR, LIB_DIR)
}

module.exports.buildComponent = async () => {
  await compile(LIB_DIR)
}
