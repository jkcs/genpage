const { smartOutputFile } = require('../../util/build/fs')
const { emptyDirSync } = require('fs-extra')
const { copy } = require('fs-extra')
const { SRC_DIR, LIB_DIR, ENTRY } = require('../../util/build/constant')
const { compileStyle, polymerizationStyle } = require('../../compiler/compile-style')
const { compileTs } = require('../../compiler/compile-ts')
const { isStyle, isNeedImportStyle, isUtils, isMixins } = require('../../util/build/index')
const { getFiles, isDir, generateComponentEnter } = require('../../util/build/fs')
const { join } = require('path')
const buildAllComponentsJs = require('../../compiler/build-all-component-js')

const styles = polymerizationStyle()

/**
 * just compile style
 */
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

  if (isUtils(filePath) || isMixins(filePath)) {
    return compileTs(filePath)
  }

  // return remove(filePath);
}

const compile = async (dir) => {
  const files = getFiles(dir)
  const queue = files
    .map(filename => {
      const filePath = join(dir, filename)

      if (isDir(filePath)) {
        return compile(filePath)
      }

      return compileFile(filePath)
    })
  const stylePath = join(LIB_DIR, 'index.less')

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

const buildLib = async () => {
  emptyDirSync(LIB_DIR)
  await copy(SRC_DIR, LIB_DIR)
}

const buildComponent = async () => {
  await compile(LIB_DIR)

  smartOutputFile(ENTRY, buildAllComponentsJs())
  // await build()
}

module.exports = {
  compile,
  buildLib,
  compileFile,
  buildComponent
}
