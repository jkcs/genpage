'use strict'
const { compileJs } = require('../compiler/compile-js')
const { smartOutputFile } = require('../util/build/fs')
const buildAllComponentsJs = require('../compiler/build-all-component-js')
const path = require('path')

const { LIB_DIR } = require('../util/build/constant')
const ID = 'genpage-polymerization-components-plugin'

class PolymerizationComponentsPlugin {

  constructor () {
  }

  apply (compiler) {
    compiler.hooks.done.tap(ID, stats => {
      const filePath = path.resolve(LIB_DIR, 'index.js')
      smartOutputFile(filePath, buildAllComponentsJs())
      compileJs(filePath)

      console.log(`polymerization components complete`)
    })
  }

}

module.exports = PolymerizationComponentsPlugin
