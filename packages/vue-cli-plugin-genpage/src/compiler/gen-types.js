const { ROOT } = require('../util/build/constant')
const fs = require('fs-extra')
const path = require('path')
const { chalk, log, warn, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')

module.exports.genTypes = async function () {
  const execa = require('execa')
  const configPath = path.join(ROOT, './tsconfig.declaration.json')

  if (fs.existsSync(configPath)) {
    logWithSpinner('Generate types')
    try {
      const { stdout } = await execa('npx tsc', ['-p', configPath])
      stdout && warn(stdout)
    } catch (e) {
      log()
      log(`exe command ${chalk.blueBright('npx tsc')} filed. try ${chalk.blueBright('tsc')} now.`)
      const { stdout } = await execa('tsc', ['-p', configPath])
      stdout && warn(stdout)
    }

    stopSpinner(true)
  } else {
    warn(`Can not generate. No ts declaration config file in ${configPath}`)
  }

}
