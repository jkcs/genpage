const { generateComponentEntry } = require('../util/build/fs')
const { PACKAGE_JSON } = require('../util/build/constant')

function buildAllComponentsJs() {
  const { version } = require(PACKAGE_JSON)
  const components = generateComponentEntry()
  const CRLF = '\r\n'
  let importComponents = []
  let constComponents = []
  let vueUse = []

  Object.keys(components).forEach(component => {
    importComponents.push(`import ${component} from './${component}'`)
    constComponents.push(`  ${component}`)
    vueUse.push(`   vue.use(${component})`)
  })

  importComponents = importComponents.join(CRLF)
  constComponents = constComponents.join(',' + CRLF)
  vueUse = vueUse.join(CRLF)

  return`${importComponents}

const install = function(vue) {
${vueUse}
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '${version}',
  install,
${constComponents}
}
  `
}

module.exports = buildAllComponentsJs
