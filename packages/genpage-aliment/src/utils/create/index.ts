import { VueConstructor } from 'vue/types'
import { createBEM, BEM } from './bem'
import { createComponent } from './component'
import { ComponentOptions, DirectiveOptions } from 'vue'
import Vue from 'vue'
import { lowerLine } from '@/utils'

export interface GenDirectiveOptions extends DirectiveOptions {
  name: string
}

type CreateNamespaceReturn = {
  createComponent: ReturnType<typeof createComponent>,
  createBEM: BEM
}

enum InstallType {
  component = 'component',
  filter = 'filter',
  directive = 'directive'
}

export const prefix = 'gen-'

export function getName(name: string): string {
  return prefix + name
}

export function createNamespace(name: string): CreateNamespaceReturn {
  name = getName(name)
  return {
    createComponent: createComponent(name),
    createBEM: createBEM(name)
  }
}

export function injectInstall(
  options: ComponentOptions<Vue> | GenDirectiveOptions | Function,
  installType: InstallType = InstallType.component
): { install: (Vue: VueConstructor) => void } {
  const { name } = options
  return {
    install: (Vue: VueConstructor) => {
      switch (installType) {
        case InstallType.directive:
          Vue.directive(getName(lowerLine(name as string)), options as DirectiveOptions)
          break
        case InstallType.filter:
          Vue.filter(getName(lowerLine(name as string)), options as Function)
          break
        case InstallType.component:
        default:
          Vue.component(getName(lowerLine(name as string)), options)
      }
    }
  }
}
