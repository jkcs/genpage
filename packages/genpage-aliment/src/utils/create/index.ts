import { VueConstructor } from 'vue/types'
import { createBEM as buildBEM, BEM } from './bem'
import { ComponentOptions, DirectiveOptions } from 'vue'
import Vue from 'vue'
import { lowerLine } from '@/utils/format/string'
import Constant from '@/utils/enum/Constant'
import InstallType from '@/utils/enum/InstallType'

export interface GenDirectiveOptions extends DirectiveOptions {
  name: string
}

const prefix = Constant.PREFIX

export function getClassName(name: string): string {
  return prefix + Constant.SEPARATOR + lowerLine(name)
}

export function getInstallName(name: string): string {
  return prefix.slice(0, 1).toLocaleUpperCase() + prefix.slice(1, prefix.length) + name
}

export function createBEM(name: string): BEM {
  name = lowerLine(name)
  return buildBEM(getClassName(name))
}

export function injectInstall(
  options: ComponentOptions<Vue> | GenDirectiveOptions | Function,
  installType: InstallType = InstallType.COMPONENT
): { install: (Vue: VueConstructor) => void } {
  const { name } = options
  console.log(name)

  return {
    install: (Vue: VueConstructor) => {
      switch (installType) {
        case InstallType.DIRECTIVE:
          Vue.directive(getInstallName(name as string), options as DirectiveOptions)
          break
        case InstallType.FILTER:
          Vue.filter(getInstallName(name as string), options as Function)
          break
        case InstallType.COMPONENT:
        default:
          Vue.component(getInstallName(name as string), options)
      }
    }
  }
}
