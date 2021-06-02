const injectBuildCommand = require('./src/commands/build')
const injectBuildLibCommand = require('./src/commands/build/lib')
const injectServeCommand = require('./src/commands/serve')

module.exports = (api, options) => {
  injectBuildLibCommand(api, options)

  injectServeCommand(api, options)

  injectBuildCommand(api, options)
}
