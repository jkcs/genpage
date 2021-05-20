export * from './fs'
export * from './constant'

export function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

export const EXT_REGEXP = /\.\w+$/
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
export const STYLE_REGEXP = /\.(css|less|scss)$/

export function replaceExt(path, ext) {
  return path.replace(EXT_REGEXP, ext)
}

export function isScript(path) {
  return SCRIPT_REGEXP.test(path)
}

export function isStyle(path) {
  return STYLE_REGEXP.test(path)
}
