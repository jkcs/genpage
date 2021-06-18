import { createBEM as buildBEM, BEM } from './bem'

import Constant from '../enum/Constant'

const prefix = Constant.PREFIX

export function getName (name: string): string {
  return prefix + Constant.SEPARATOR + name
}

export function createBEM (name: string): BEM {
  return buildBEM(name)
}
