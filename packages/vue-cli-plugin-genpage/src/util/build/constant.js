const { join } = require('path')

// root
const ROOT = process.env.VUE_CLI_BUILD_TARGET || process.cwd()
const SRC_DIR = join(ROOT, 'src')
const LIB_DIR = join(ROOT, 'lib')
const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']
const STYLE_DIR = join(SRC_DIR, 'style')
const CONFIG_DIR = join(__dirname, '../../config')
const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')

exports.ROOT = ROOT
exports.SRC_DIR = SRC_DIR
exports.LIB_DIR = LIB_DIR
exports.ENTRY_EXTS = ENTRY_EXTS
exports.STYLE_DIR = STYLE_DIR
exports.CONFIG_DIR = CONFIG_DIR
exports.POSTCSS_CONFIG_FILE = POSTCSS_CONFIG_FILE
