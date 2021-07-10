const { removeSync } = require('fs-extra')
const { getFiles, isDir } = require('../util/build/fs')
const CLEAR_FILES_RULE = /[^\.d]\.(ts|tsx|scss|less)$/
const { join } = require('path')

function _isRemoveFile (filepath) {
  return CLEAR_FILES_RULE.test(filepath)
}

async function clearUselessFile (dir) {
  const files = getFiles(dir)

  return await Promise.all(files.map(filename => {
    const filePath = join(dir, filename)

    if (isDir(filePath)) {
      return clearUselessFile(filePath)
    }

    if (_isRemoveFile(filePath)) {
      return removeSync(filePath)
    }

  }))
}

module.exports = {
  clearUselessFile
}
