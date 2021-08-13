#!/usr/bin/env node
'use strict'

const { PACKAGE_JSON } = require('../src/util/build/constant')
const inquirer = require('inquirer')
const { createComponent } = require('./template/index')
const commander = require('commander')
const packageObj = require(PACKAGE_JSON)

// const commander = new Commander()

commander.version(`@genpage/vue-cli-plugin-genpage ${packageObj.version}`)

commander.command('component [name]')
  .description('create a new component')
  .action(function (name) {
    if (!!name) {
      createComponent(name)
      return
    }
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'component name:'
      }
    ])
      .then(answers => {
        createComponent(answers.name)
      })
      .catch(() => {
        console.log('get component name error')
      })
  })

commander.parse()
