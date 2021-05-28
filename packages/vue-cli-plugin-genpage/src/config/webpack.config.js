const { SRC_DIR } = require('../util/build/constant')
const { generateComponentEnter } = require('../util/build/fs')
const fs = require('fs')
const path = require('path')

const components = generateComponentEnter()
const utilsList = fs.readdirSync(path.resolve(SRC_DIR, './utils'))
const mixinsList = fs.readdirSync(path.resolve(SRC_DIR, './mixins'))
const externals = {}

Object.keys(components).forEach(function (key) {
  externals[`@/${key}`] = `@genpage/aliment/lib/${key}`
})

utilsList.forEach(function (file) {
  file = path.basename(file, path.extname(file))
  externals[`@/utils/${file}`] = `@genpage/aliment/lib/utils/${file}`
})

mixinsList.forEach(function (file) {
  file = path.basename(file, path.extname(file))
  externals[`@/mixins/${file}`] = `@genpage/aliment/lib/mixins/${file}`
})

module.exports = {
  externals
}
