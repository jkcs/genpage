const {
  existsSync,
  emptyDirSync
} = require('fs-extra')
const { smartOutputFile } = require('../../src/util/build/fs')
const { SRC_DIR } = require('../../src/util/build/constant')
const { join } = require('path')
const { chalk } = require('@vue/cli-shared-utils')
const { camelize } = require('../../src/util/build')

function createTSX (name) {
  return `import { defineComponent, SetupContext } from 'vue'
import { createBEM } from '../utils'

const {
  name,
  bem
} = createBEM('${name}')

export default defineComponent({
  name,

  props: {},

  setup (props, ctx: SetupContext) {
    return (
      <div class={bem()}>

      </div>
    )
  }
})
`
}

function createScss () {
  return `@import '../style/var';`
}

function createInstall (name) {
  const upperCaseName = camelize(name, true)
  return `import type { App } from 'vue'
import ${upperCaseName} from './${name}'
import { WithAPPInstall } from '../utils'

${upperCaseName}.install = function (app: App) {
  app.component(${upperCaseName}.name, ${upperCaseName})
}

export { ${upperCaseName} }
export default ${upperCaseName} as WithAPPInstall<typeof ${upperCaseName}>
`
}

function createComponent (name) {
  const path = join(SRC_DIR, name)
  const tsxFile = join(path, `${name}.tsx`)
  const scssFile = join(path, `index.scss`)
  const entryFile = join(path, `index.ts`)

  if (existsSync(path)) {
    console.log(`${chalk.yellow(name)} is exists. please delete it then try again`)
    return
  }

  emptyDirSync(path)
  smartOutputFile(tsxFile, createTSX(name))
  smartOutputFile(scssFile, createScss(name))
  smartOutputFile(entryFile, createInstall(name))

  console.log(`${chalk.cyan(name)} component is created.`)
}

module.exports = {
  createComponent
}
