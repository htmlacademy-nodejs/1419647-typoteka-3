'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);
const errors = require(`../errorMessages`);

const customCommands = [{
  name: `--version`,
  action: version.getVersion,
  description: `Outputs the version`
}, {
  name: `--help`,
  action: help.printInfo,
  description: `Shows the available commands`
}, {
  name: `--generate`,
  action: (count) => generate.generateMocks(count),
  description: `Outputs the version`
}];

const [userCommandName, ...commandParams] = process.argv.slice(2);
const getCommand = (commandName) => customCommands.find((command) => command.name === commandName);

const userCommand = getCommand(userCommandName);
return userCommand ? userCommand.action(commandParams) : errors.commandUnknown(userCommandName);
