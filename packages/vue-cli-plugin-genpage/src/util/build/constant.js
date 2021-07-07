const { join } = require('path')

// root
const CRLF = '\r\n'
const ROOT = process.env.VUE_CLI_BUILD_TARGET || process.cwd()
const SRC_DIR = join(ROOT, 'src')
const LIB_DIR = join(ROOT, 'lib')
const ES_DIR = join(ROOT, 'es')
const ES_ENTRY = join(ES_DIR, 'index.js')
const ENTRY = join(LIB_DIR, 'index.js')
const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']
const STYLE_DIR = join(SRC_DIR, 'style')
const CONFIG_DIR = join(__dirname, '../../config')
const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')
const WEBPACK_LIB_CONFIG_FILE = join(CONFIG_DIR, 'webpack.lib.config.js')

module.exports = {
  CRLF,
	ROOT,
	SRC_DIR,
	LIB_DIR,
  ES_DIR,
  ES_ENTRY,
	ENTRY,
	ENTRY_EXTS,
	STYLE_DIR,
	CONFIG_DIR,
	POSTCSS_CONFIG_FILE,
  WEBPACK_LIB_CONFIG_FILE
}
