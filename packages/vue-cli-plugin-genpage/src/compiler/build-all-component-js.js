const { generateComponentEnter } = require('../util/build/fs')

function buildAllComponentsJs() {
  const components = generateComponentEnter()
  console.log(components)
  const CRLF = '\n\r'
  let importComponents = []
  let constComponents = []
  let vueUse = []

  Object.keys(components).forEach(component => {
    importComponents.push(`import ${component} from './${component}/index.js'`)
    constComponents.push(`  ${component}`)
    vueUse.push(`   vue.use(${component})`)
  })
  importComponents = importComponents.join(CRLF)
  constComponents = constComponents.join(',' + CRLF)
  vueUse = vueUse.join(CRLF)
  return`
${importComponents}

const install = function(vue) {
${vueUse}
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  install,
${constComponents}
}
  `
}

module.exports = buildAllComponentsJs
