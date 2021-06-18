const { existsSync, emptyDirSync } = require('fs-extra')
const { smartOutputFile } = require('../../src/util/build/fs')
const { SRC_DIR } = require('../../src/util/build/constant')
const { join } = require('path')
const { chalk } = require('@vue/cli-shared-utils')

function createJS(name, isFunctional) {
  return`import { createBEM, getName } from '@/utils/create'

const name = getName('${name}')
const bem = createBEM(name)

const props = {
}

export default {
  name,
  ${ isFunctional ? 'functional: true,' : '' }
  props,
  
  render () {
    return (
      <div class={ [bem()] }>
      
      </div>
    )
  }
}
`
}

function createLess() {
  return `@import '../style/var';
`
}

function createInstall(name) {
  return `import ${name} from './${name}'

${name}.install = function (Vue) {
  Vue.component(${name}.name, ${name})
}
export default ${name}
`
}

function createComponent(name, isFunctional) {
  const path = join(SRC_DIR, name)
  const jsFile = join(path, `${name}.js`)
  const lessFile = join(path, `index.less`)
  const entryFile = join(path, `index.js`)

  if (existsSync(path)) {
    console.log(`${chalk.yellow(name)} is exists. please delete it then try again`)
    return
  }

  emptyDirSync(path)
  smartOutputFile(jsFile, createJS(name, isFunctional))
  smartOutputFile(lessFile, createLess(name))
  smartOutputFile(entryFile, createInstall(name))

  console.log(`${chalk.cyan(name)} component is created.`)
}

module.exports = {
  createComponent
}
