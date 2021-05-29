const { command, version, parse } = require('commander')

version('genpage v0.1.0')
command('component <component>')
  .description('build new component')
  .action((component) => {
    console.log(component);
    
  })

parse([])