const { ROOT } = require('../util/build/constant')
const fs = require('fs-extra')
const path = require('path')
const { done, error, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')

module.exports.genTypes = async function () {
  const execa = require('execa')
  const configPath = path.join(ROOT, './tsconfig.declaration.json')
  if (fs.existsSync(configPath)) {
    logWithSpinner('Generate types')
    const { stdout } = await execa('npx tsc', ['-p', configPath])
    if (stdout) {
      error(stdout)
      return
    }
    stopSpinner(true)
    done(`Generated types complete. `)
  }

}
