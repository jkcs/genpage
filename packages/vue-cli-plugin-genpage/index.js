const injectBuildCommand = require('./src/commands/build')
const injectServeCommand = require('./src/commands/serve')

module.exports = (api, options) => {
  injectServeCommand(api, options)

  injectBuildCommand(api, options)
}
