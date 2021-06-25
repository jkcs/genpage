import { createBEM as buildBEM, BEM } from './bem'

import constant from '../constant'

const prefix = constant.PREFIX

export function getName (name: string): string {
  return prefix + constant.SEPARATOR + name
}

export function createBEM (name: string): { name: string, bem: BEM } {
  name = getName(name)

  return {
    name,
    bem: buildBEM(name)
  }
}
