var inquirer = require('inquirer')

inquirer.prompt([
  {
    type: 'list',
    name: 'type',
    message: 'choose component type',
    choices: [
      'jsx', 'functional'
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'input component name'
  }
])
  .then(answers => {
    console.log(answers)
  })
