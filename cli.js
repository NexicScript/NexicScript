#!/usr/bin/env node

const command = String(process.argv[2] || "").trim();
const args = process.argv.slice(3);

function printHelp() {
    console.log(`
NXS - NexicScript

Build project folders in one command.

Commands:

  nxs create <template>      Create a project from a template
  nxs templates              Open the interactive template picker
  nxs list                   Show all templates and add-ons
  nxs list --category <id>    Show templates from one category
  nxs list add               Show only add-ons for existing projects
  nxs add <addon>            Expand an existing project with extra folders/files
  nxs install <category>     Install a template category pack
  nxs info <template>        See what a template includes
  nxs help                   Show this help screen

Examples:

  nxs create web-basic
  nxs create api
  nxs list --category backend
  nxs list add
  nxs add testing
  nxs install web
`);
}

function showFriendlyError(error) {
    const message = String(error && error.message ? error.message : error || "Unknown error");

    if (message.includes("UnknownPromptTypeError") || message.includes("prompt type")) {
        console.log("NexicScript could not open a prompt menu. Please reinstall the CLI or update its dependencies.");
        return;
    }

    if (message.includes("was not found")) {
        console.log("NexicScript could not find that item. Use 'nxs list' or 'nxs list add' to see valid options.");
        return;
    }

    console.log("NexicScript could not complete that command.");
    console.log(`Details: ${message}`);
    console.log("Need help? contact@nexicscript.org");
}

(async () => {
    try {
        switch (command) {
            case "":
            case "help":
            case "--help":
            case "-h":
                printHelp();
                break;

            case "create":
                await require("./commands/create")(args[0]);
                break;

            case "templates":
                await require("./commands/templates")();
                break;

            case "list":
                require("./commands/list-command")(args);
                break;

            case "add":
                require("./commands/add-command")(args[0]);
                break;

            case "info":
                require("./commands/info")(args[0]);
                break;

            case "install":
                require("./commands/install")(args[0]);
                break;

            default:
                console.log(`Unknown command: ${command}\n`);
                printHelp();
                break;
        }
    } catch (error) {
        showFriendlyError(error);
    }
})().catch(error => {
    showFriendlyError(error);
});
