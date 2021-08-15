const { generateComponentEntry } = require('../util/build/fs')
const { PACKAGE_JSON } = require('../util/build/constant')
const { camelize } = require('../util/build')

function buildAllComponentsJs() {
  const { version } = require(PACKAGE_JSON)
  const components = generateComponentEntry()
  const CRLF = '\r\n'
  let importComponents = []
  let constComponents = []
  let vueUse = []

  Object.keys(components).forEach(component => {
    const componentName = camelize(component, true)
    importComponents.push(`import ${componentName} from './${component}'`)
    constComponents.push(`${componentName}`)
    vueUse.push(`   app.use(${componentName})`)
  })

  importComponents = importComponents.join(CRLF)
  constComponents = constComponents.join(', ')
  vueUse = vueUse.join(CRLF)

  return`${importComponents}

const install = function(app: any) {
${vueUse}
}

export { ${constComponents} }

export default {
  version: '${version}',
  install,
}
  `
}

module.exports = buildAllComponentsJs
