import { isDef, isNumeric } from '../shared'

export function hasUnit (value: string): boolean {
  const units = ['px', 'pt', '%', 'em', 'rem']

  return units.some(unit => value.slice(value.length - unit.length, value.length) === unit)
}

export function addUnit (value: string | number): string | undefined {
  if (!isDef(value)) {
    return value
  }

  return isNumeric(value) ? `${value}px` : String(value)
}

