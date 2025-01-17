const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const tplObj = require(`${__dirname}/../template`);

program
  .usage('<template-name> [project-name]')
program.parse(process.argv);

if (process.argv.length < 1) {
  return program.help();
}
let templateName = program.args[0];
let projectName = program.args[1];
if (!tplObj[templateName]) {
  console.log(chalk.red('\n Template does not exit!  \n'));
  return;
}
if (!projectName) {
  console.log(chalk.red('\n Project should not be empty  \n'));
  return;
}

url = tplObj[templateName];
console.log(chalk.white('\n Start generating... \n'));
const spinner = ora('Downloading...');
spinner.start();

download(
  url,
  projectName,
  err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`));
      return;
    }
    spinner.succeed();
    console.log(chalk.green('\n Generation completed. \n'));
    console.log('\n To get started');
    console.log(`\n  cd ${projectName} \n`);
  },
);