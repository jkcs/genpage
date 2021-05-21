const { emptyDirSync } = require('fs-extra')
const { copy } = require('fs-extra')
const { SRC_DIR, LIB_DIR } = require('../../util/build/constant')
const { compileStyle } = require('../../compiler/compile-style')
const { getFiles, isDir, isStyle } = require('../../util/build/index')
const { join } = require('path')

const compileFile = (filePath) => {
  /*if (isScript(filePath)) {
    return compileJs(filePath);
  }*/

  if (isStyle(filePath)) {
    return compileStyle(filePath);
  }

  // return remove(filePath);
}

module.exports.compileFile = compileFile

const compile = async (dir) => {
  const files = getFiles(dir)
  console.log(files)
  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename)

      console.log(filePath)
      if (isDir(filePath)) {
        return compile(filePath)
      }

      return compileFile(filePath)
    })
  )
}
module.exports.compile = compile

module.exports.buildLib = async () => {
  emptyDirSync(LIB_DIR)
  await copy(SRC_DIR, LIB_DIR)
}

module.exports.buildComponent = async () => {
  await compile(LIB_DIR)
}
