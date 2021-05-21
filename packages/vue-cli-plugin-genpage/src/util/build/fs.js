const {
  readdirSync,
  lstatSync,
  existsSync,
  readFileSync,
  outputFileSync
} = require('fs-extra')
const { join } = require('path')
const { SRC_DIR } = require('./constant')
const { cached } = require('./index')

function getFiles(dir = SRC_DIR) {
  // return cached(readdirSync)(dir)
  return readdirSync(dir)
}

exports.getFiles = getFiles

function isDir(dir) {
  return lstatSync(dir).isDirectory()
}

exports.isDir = isDir

async function getCompileDir(dir = SRC_DIR) {
  const files = getFiles()

  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename)

      if (isDir(filePath)) {
        return getCompileDir(filePath)
      }

      return getCompileDir(filePath)
    })
  )
}

exports.getCompileDir = getCompileDir

function smartOutputFile(filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')

    if (previousContent === content) {
      return
    }
  }

  outputFileSync(filePath, content)
}

exports.smartOutputFile = smartOutputFile

function hasDefaultExport(code) {
  return code.includes('export default') || code.includes('export { default }');
}

exports.hasDefaultExport = hasDefaultExport

function getComponents() {
  const dirs = getFiles()
  return dirs
    .filter((dir) =>
      ENTRY_EXTS.some((ext) => {
        const path = join(SRC_DIR, dir, `index.${ext}`)
        if (existsSync(path)) {
          return hasDefaultExport(readFileSync(path, 'utf-8'))
        }

        return false
      })
    )
}

exports.getComponents = getComponents
