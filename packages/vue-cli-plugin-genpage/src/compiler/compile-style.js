const { join, parse, relative, sep } = require('path')
import { readFileSync, writeFileSync } from 'fs'
import { FileManager, render } from 'less'
import { compileCss } from './compile-css'
import { replaceExt } from '../util/build'

class TildeResolver extends FileManager {
  loadFile(filename, ...args) {
    filename = filename.replace('~', '');
    return FileManager.prototype.loadFile.apply(this, [filename, ...args]);
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver());
  },
}

async function compileLess(filePath) {
  const source = readFileSync(filePath, 'utf-8')
  const { css } = await render(source, {
    filename: filePath,
    plugins: [TildeResolverPlugin]
  })

  return css
}

async function compileFile(filePath) {
  const parsedPath = parse(filePath)

  try {
    if (parsedPath.ext === '.less') {
      const source = await compileLess(filePath)
      return await compileCss(source)
    }

    const source = readFileSync(filePath, 'utf-8')
    return await compileCss(source)
  } catch (err) {
    consola.error('Compile style failed: ' + filePath)
    throw err
  }
}

export async function compileStyle(filePath) {
  const css = await compileFile(filePath)

  writeFileSync(replaceExt(filePath, '.css'), css)
}
