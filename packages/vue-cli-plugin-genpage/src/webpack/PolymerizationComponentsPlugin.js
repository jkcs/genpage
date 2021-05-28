'use strict'
const { transformFile } = require('@babel/core')
const ID = 'genpage-polymerization-components-plugin'

class PolymerizationComponentsPlugin {

  constructor () {
  }

  apply (compiler) {
    compiler.hooks.done.tap(ID, stats => {

    })
  }

}
