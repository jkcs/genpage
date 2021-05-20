import {
  readdirSync,
  lstatSync,
  existsSync,
  readFileSync,
  outputFileSync
} from 'fs-extra'
import { join } from 'path'
import { SRC_DIR } from './constant'
import { cached } from './index'

export function getFiles(dir = SRC_DIR) {
  return cached(readdirSync)(dir)
}

export function isDir(dir) {
  return lstatSync(dir).isDirectory()
}

export async function getCompileDir(dir = SRC_DIR) {
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

export function smartOutputFile(filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')

    if (previousContent === content) {
      return
    }
  }

  outputFileSync(filePath, content)
}

export function hasDefaultExport(code) {
  return code.includes('export default') || code.includes('export { default }');
}

export function getComponents() {
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
