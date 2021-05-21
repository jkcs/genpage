const fs = require('./fs')
const constant = require('./constant')

function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

const EXT_REGEXP = /\.\w+$/
const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
const STYLE_REGEXP = /\.(css|less|scss)$/

function replaceExt(path, ext) {
  return path.replace(EXT_REGEXP, ext)
}

function isScript(path) {
  return SCRIPT_REGEXP.test(path)
}

function isStyle(path) {
  return STYLE_REGEXP.test(path)
}

module.exports = {
  ...fs,
  ...constant,
  cached,
  EXT_REGEXP,
  SCRIPT_REGEXP,
  STYLE_REGEXP,
  replaceExt,
  isScript,
  isStyle
}
