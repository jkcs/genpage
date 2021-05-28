const { generateComponentEnter } = require('../util/build/fs')

function buildAllComponentsJs() {
  const components = generateComponentEnter()
  console.log(components)
  const LF = '\r'
  let importComponents = []
  let constComponents = []
  let vueUse = []

  Object.keys(components).forEach(component => {
    importComponents.push(`import ${component} from './${component}/index.js'`)
    constComponents.push(component)
    vueUse.push(`vue.use(${component})`)
  })
  importComponents = importComponents.join(LF)
  constComponents = constComponents.join(',' + LF)
  vueUse = vueUse.join(LF)
  console.log(importComponents)
  console.log(constComponents)
  console.log(vueUse)
  return`
import vue from 'vue'
${importComponents}

const components = [
  ${constComponents}
]

const install = function() {

}

export default {
  version: '0.1.0',
  install: function (Vue) {
    ${vueUse}
  },
  ${constComponents}
}
  `
}

module.exports = buildAllComponentsJs
