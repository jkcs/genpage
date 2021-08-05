export function keys<T = Record<string, unknown>> (obj: T) {
  return Object.keys(obj) as Array<keyof T>
}

export function pick<T, K extends keyof T> (
  source: T,
  keys: ReadonlyArray<K>,
  ignoreUndefined = false
) {
  return keys.reduce((result, key) => {
    if (!ignoreUndefined || source[key] !== undefined) {
      result[key] = source[key]
    }
    return result
  }, {} as Pick<T, K>)
}

export function isDef<T> (val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

export function isNumeric (val: string | number): val is string {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}
