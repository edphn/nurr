#!/usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');
const { nurr: { params } } = require('./../package.json');
const { createQuestions, composeCommand, validateInitiatingCommand } = require('./nurr');
const initiatingCommand = process.env[`npm_package_scripts_${process.env.npm_lifecycle_event}`];

const executeCommand = command => command && exec(command).stdout.pipe(process.stdout);

const handleError = error => {
    console.log(error.message);
    process.exit(1);
};

process.on('uncaughtException', handleError);

if (!validateInitiatingCommand(initiatingCommand)) {
    throw new Error(`Invalid command: ${initiatingCommand}`);
}

inquirer
    .prompt(createQuestions(params))
    .then(composeCommand(initiatingCommand))
    .then(executeCommand)
    .catch(handleError)
