const shell = require("shelljs");
const chalk = require("chalk");

const { validFlags, argRules } = require("../config");

const Utils = class {
    constructor(config) {
        for (let key in config) {
            this[key] = config[key];
        }
        this.validateCommand = this.validateCommand.bind(this);
    }

    _isFlag(arg) {
        return /^[-]+[a-z]+$/i.test(arg);
    }
    _handleError(message, values = []) {
        values.forEach(value => value = null);
        shell.echo(`\n${chalk.red.inverse(`Error`)}: ${chalk.bold.red(message)}\n`);
        shell.exit(1);
    }
    _validateFlags(args) {
        let dupes = {};
        const flags = [];
        args.forEach(arg => {
            if (!this._isFlag(arg)) return;
            const flag = validFlags.find(flag => flag.name === arg)
            if (!flag) {
                this._handleError(`Invalid Flag name '${arg}'`, [flags, dupes]);
            }
            if (dupes[arg]) {
                this._handleError(`Duplicate Flag name '${arg}'`, [flags, dupes]);
            } else {
                dupes[arg] = 1;
                flags.push(flag);
            }
        });
        return flags;
    }
    _validateArgs(args, rules) {
        const firstFlagIndex = args.indexOf(args.find(arg => this._isFlag(arg)));
        const argList = args.slice(0, firstFlagIndex > -1 ? firstFlagIndex : undefined);
        for (let key in rules) {
            this.validators[key](argList, rules[key].value, () => this._handleError(rules[key].err));
        }
        return argList;
    }
    validateCommand() {
        const args = process.argv.slice(2);
        const flags = this._validateFlags(args);
        return {
            argList: this._validateArgs(args, argRules),
            flags: flags.map(flag => ({
                name: flag.name,
                argList: this._validateArgs(args.slice(args.indexOf(flag.name) + 1), flag.argRules)
            }))
        }
    }
}


module.exports = new Utils({
    validators: {
        limit: (argList, value, handleError) => argList.length > value ? handleError() : true,
        min: (argList, value, handleError) => argList.length < value ? handleError() : true
    }
});