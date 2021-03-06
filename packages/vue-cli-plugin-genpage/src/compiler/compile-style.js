const { parse, relative, sep } = require('path')
const { readFileSync, writeFileSync } = require('fs-extra')
const { FileManager, render } = require('less')
const sass = require('sass')
const { compileCss } = require('./compile-css')
const { replaceExt, isStyleDirStyle } = require('../util/build')

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

const compileSass = async (filePath) => {
  return sass.renderSync({ file: filePath })
}

const compileFile = async (filePath) => {
  const parsedPath = parse(filePath)

  try {
    if (parsedPath.ext === '.less') {
      const source = await compileLess(filePath)
      return await compileCss(source)
    }
    if (parsedPath.ext === '.scss') {
      const source = await compileSass(filePath)
      return await compileCss(source.css.toString())
    }

    const source = readFileSync(filePath, 'utf-8')
    return await compileCss(source)
  } catch (err) {
    console.log('Compile style failed: ' + filePath)
    console.log(err)
    throw err
  }
}


const compileStyle = async (filePath) => {
  const css = await compileFile(filePath)

  writeFileSync(replaceExt(filePath, '.css'), css)
}

const polymerizationStyle = (dir) => {
  const contentArr = []
  return function (absolutePath) {
    if (absolutePath) {
      const reg = new RegExp('\\' + sep, 'g')
      const relativePath = relative(dir, absolutePath).replace(reg, '/')
      const content = `@import '${relativePath}'; \n`

      if (isStyleDirStyle(absolutePath)) {
        contentArr.unshift(content)
      } else {
        contentArr.push(content)
      }
    }

    return contentArr
  }
}

module.exports = {
  compileLess,
  compileFile,
  compileStyle,
  polymerizationStyle
}
