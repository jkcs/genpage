import Constant from '../enum/Constant'

const camelizeRE = /-(\w)/g
const lowerLineRE = /[A-Z]/g

export function camelize (str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

export function lowerLine (str: string): string {
  const s = str.replace(lowerLineRE, (_) => (Constant.SEPARATOR + _.toLowerCase()))
  if (s.slice(0, 1) === Constant.SEPARATOR) {
    return s.slice(1)
  }
  return s
}

export function padStart (str: string, targetLength = 2, sym: (number | string) = 0): string {
  while (str.length < targetLength) {
    str = String(sym) + str
  }

  return str
}
