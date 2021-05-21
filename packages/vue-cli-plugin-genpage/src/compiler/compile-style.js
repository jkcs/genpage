const { join, parse, relative, sep } = require('path')
const { readFileSync, writeFileSync } = require('fs-extra')
const { FileManager, render } = require('less')
const { compileCss } = require('./compile-css')
const { replaceExt } = require('../util/build')

class TildeResolver extends FileManager {
  loadFile(filename, ...args) {
    filename = filename.replace('~', '')
    return FileManager.prototype.loadFile.apply(this, [filename, ...args])
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver())
  }
}

const compileLess = async (filePath) => {
  const source = readFileSync(filePath, 'utf-8')
  const { css } = await render(source, {
    filename: filePath,
    plugins: [TildeResolverPlugin]
  })

  return css
}
module.exports.compileLess = compileLess

const compileFile = async (filePath) => {
  const parsedPath = parse(filePath)

  try {
    if (parsedPath.ext === '.less') {
      const source = await compileLess(filePath)
      return await compileCss(source)
    }

    const source = readFileSync(filePath, 'utf-8')
    return await compileCss(source)
  } catch (err) {
    // consola.error('Compile style failed: ' + filePath)
    console.log('Compile style failed: ' + filePath)
    console.log(err)
    throw err
  }
}

module.exports.compileFile = compileFile

module.exports.compileStyle = async (filePath) => {
  const css = await compileFile(filePath)

  writeFileSync(replaceExt(filePath, '.css'), css)
}
