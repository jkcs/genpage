export type Install = (app: any) => void

export type WithAPPInstall<T = Record<string, unknown>> = T & { install: Install }

/**
 * the ComponentSize
 * desc: max replace 'extra large' min replace 'extra small'
 */
export type ComponentSize = 'max' | 'large' | 'medium' | 'small' | 'min'
