#!/usr/bin/env node
const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('create', 'create a new project')
  .command('add', 'add a new template')
  .command('delete', 'delete a template')
  .command('list', 'list all templates')
  .command('init', 'generate a new project from template');

program.parse(process.argv);