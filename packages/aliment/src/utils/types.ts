import type { App } from 'vue'

export type Install = (app: App) => void

export type WithAPPInstall<T = Record<string, unknown>> = T & { install: Install }
