'use strict'
const { compileJs } = require('../compiler/compile-js')
const buildAllComponentsJs = require('../compiler/build-all-component-js')
const ID = 'genpage-polymerization-components-plugin'

class PolymerizationComponentsPlugin {

  constructor () {
  }

  apply (compiler) {
    compiler.hooks.done.tap(ID, stats => {
      console.log(buildAllComponentsJs())
    })
  }

}

module.exports = PolymerizationComponentsPlugin
