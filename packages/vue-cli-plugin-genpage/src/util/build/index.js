const { sep } = require('path')

function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

const CAMELIZE_REGEXP = /-(\w)/g
const EXT_REGEXP = /\.\w+$/
const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
const TSX_REGEXP = /\.tsx$/
const STYLE_REGEXP = /\.(css|less|scss)$/
const UTILS_REGEXP = new RegExp(`\\${sep}utils\\${sep}.+\.ts`)
const MIXINS_REGEXP = new RegExp(`\\${sep}mixins\\${sep}.+\.ts`)
const STYLE_DIR_REGEXP = new RegExp(`\\${sep}style\\${sep}`)
const NEED_IMPORT_STYLE_REGEXP = /[^lib][^\w]index\.(css|less|scss)$/

function replaceExt(path, ext) {
  return path.replace(EXT_REGEXP, ext)
}

function isTSX(path) {
  return TSX_REGEXP.test(path)
}

function isScript(path) {
  return SCRIPT_REGEXP.test(path)
}

function isUtils(path) {
  return UTILS_REGEXP.test(path)
}

function isMixins(path) {
  return MIXINS_REGEXP.test(path)
}

function isStyle(path) {
  return STYLE_REGEXP.test(path)
}

function isStyleDirStyle(path) {
  return isStyle(path) && STYLE_DIR_REGEXP.test(path)
}

function isNeedImportStyle(path) {
  return NEED_IMPORT_STYLE_REGEXP.test(path)
}

function camelize(str, isCapitalize) {
  str = isCapitalize
    ? `-${str}`
    : str

  return str.replace(CAMELIZE_REGEXP, (_, c) => c.toUpperCase())
}

module.exports = {
  cached,
  EXT_REGEXP,
  SCRIPT_REGEXP,
  STYLE_REGEXP,
  replaceExt,
  isScript,
  isTSX,
  isStyle,
  isUtils,
  isNeedImportStyle,
  isStyleDirStyle,
  isMixins,
  camelize
}
