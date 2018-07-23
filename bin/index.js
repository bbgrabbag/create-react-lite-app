#! /usr/bin/env node

//DEPENDENCIES
const shell = require("shelljs");
const chalk = require("chalk");

//IMPORTS
const { validateCommand, _handleError } = require("../utils");

if (!shell.which('git')) {
    _handleError('this script requires git');
}

const commandMap = validateCommand();
const [dest] = commandMap.argList;
const depFlag = commandMap.flags.find(flag => flag.name === "-dep");
const dependencies = depFlag ? depFlag.argList.join(" ") : "";

shell.exec(`git clone https://github.com/bbgrabbag/react-boiler ${dest}`);
shell.cd(dest);
shell.exec(`rm -rf .git`);
shell.exec(`git init`);

shell.echo(`
${chalk.cyan(`Installing dev dependencies...`)}
`);
shell.exec(`npm i`);
if (dependencies) {
    shell.echo(chalk.cyan(`
    Installing project dependencies...
    `));
    shell.exec(`npm install --save ${dependencies}`);
} else {
    shell.echo(chalk.yellow(`No project dependencies found...`));
}

shell.echo(chalk.cyan(`
Starting dev server
`));
shell.exec(`npm start`);
