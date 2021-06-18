const inquirer = require('inquirer')
const { createComponent } = require('./template/index')

inquirer.prompt([
  {
    type: 'list',
    name: 'type',
    message: 'choose component type',
    choices: [
      'normal', 'functional'
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'input component name'
  }
])
  .then(answers => {
    createComponent(
      answers.name,
      answers.type === 'functional'
    )
  })
