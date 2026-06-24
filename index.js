#!/usr/bin/env node

const command = process.argv[2];
const argument = process.argv[3];

(async () => {
    switch (command) {
        case "create":
            require("./commands/create")(argument);
            break;

        case "templates":
            await require("./commands/templates")();
            break;

        case "info":
            require("./commands/info")(argument);
            break;

        default:
            console.log(`
NXS - NexicScript

Build project folders in one command.

Commands:

  nxs create <template>   Create a project from a template
  nxs templates           Pick a category and template from a menu
  nxs info <template>     See what a template includes

Example:

  nxs create web-basic
`);
    }
})();
