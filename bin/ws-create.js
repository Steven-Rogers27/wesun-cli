const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const tplObj = require(`${__dirname}/../template`);

program
  .usage('[project-name]');
program.parse(process.argv);

if (process.argv.length < 1) {
  return program.help();
}

const question = [
  {
    name: 'name',
    type: 'rawlist',
    message: 'please select a project template',
    default: 'allsense',
    choices: [
      'allsense',
    ],
  },
];

inquirer.
  prompt(question).then(answers => {
    const projectName = program.args[0];
    const { name, } = answers;
    console.log(`templateName: ${name}, projectName: ${projectName}`);
    const url = tplObj[name];
    console.log(chalk.white('\n Start generating... \n'));
    const spinner = ora('Downloading...');
    spinner.start();
    download(
      url,
      projectName,
      err => {
        if (err) {
          spinner.fail();
          console.log(chalk.red(`\n Generation failed. ${err} \n`));
          return;
        }
        spinner.succeed();
        console.log(chalk.green('\n Generation completed. \n'));
      }
    );
  });