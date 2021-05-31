const {
  readdirSync,
  lstatSync,
  existsSync,
  readFileSync,
  outputFileSync
} = require('fs-extra')
const { join } = require('path')
const { SRC_DIR, ENTRY_EXTS } = require('./constant')
const { cached } = require('./index')

function getFiles(dir = SRC_DIR) {
  return cached(readdirSync)(dir)
}

function isDir(dir) {
  return lstatSync(dir).isDirectory()
}

function smartOutputFile(filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')

    if (previousContent === content) {
      return
    }
  }

  outputFileSync(filePath, content)
}

function hasDefaultExport(code) {
  return code.includes('export default') || code.includes('export { default }');
}

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

function generateComponentEntry() {
  const components = getComponents()

  return components
    .map(component => {
      const enterPath = (ext) => {
        return join(SRC_DIR, component, `index.${ext || 'ts'}`)
      }

      const ext = ENTRY_EXTS.find(ext => existsSync(enterPath(ext)))

      return {
        [component]: enterPath(ext)
      }
    })
    .reduce(
      (obj, item) => Object.assign(obj, item),
      {}
    )
}

module.exports = {
  getComponents,
  getFiles,
  isDir,
  smartOutputFile,
  hasDefaultExport,
  generateComponentEntry
}
