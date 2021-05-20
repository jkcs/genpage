import { join } from 'path'

// root
export const ROOT = process.env.VUE_CLI_BUILD_TARGET || process.cwd()
export const SRC_DIR = join(ROOT, 'src')
export const LIB_DIR = join(ROOT, 'lib')
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']
export const STYLE_DIR = join(SRC_DIR, 'style')
