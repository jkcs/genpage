import { copy } from 'fs-extra'
import { SRC_DIR, LIB_DIR } from '../../util/build/constant'
import { compileStyle } from '../../compiler/compile-style'
import { getFiles, isDir, isStyle } from '../../util/build'
import { join } from 'path'

async function compileFile(filePath) {
  /*if (isScript(filePath)) {
    return compileJs(filePath);
  }*/

  if (isStyle(filePath)) {
    return compileStyle(filePath);
  }

  // return remove(filePath);
}

async function compile() {
  const files = getFiles(LIB_DIR)

  await Promise.all(
    files.map(filename => {
      const filePath = join(LIB_DIR, filename)

      if (isDir(filePath)) {
        return compile(filePath)
      }

      return compileFile(filePath)
    })
  )
}

export async function buildLib() {
  await copy(SRC_DIR, LIB_DIR)
}

export async function buildComponent() {
  await compile()
}
