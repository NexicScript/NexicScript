# NexicScript

NexicScript is the official project generator CLI from the NexicScript organization.

It helps developers create clean starter projects from categorized template packs, with a simple workflow and a consistent brand identity.

## Brand

NexicScript uses a dark blue and purple visual identity.

- Dark blue: `#0F172A`
- Purple: `#7C3AED`

The official logo is the file at [`Logo.png`](./Logo.png).

## Official contact

- Email: [contact@nexicscript.org](mailto:contact@nexicscript.org)

## Install

```bash
npm install -g nexicscript
```

## Quick start

```bash
nxs templates
```

Choose a category, pick a template, and NexicScript will load the correct pack for you.

## Commands

### `nxs templates`
Open the interactive menu. First choose a category, then choose a template.

### `nxs create <template>`
Create a project from a template directly.

Examples:

```bash
nxs create web-basic
nxs create react-app
nxs create node-api
```

### `nxs info <template>`
Show information about a template, including its category and package.

Example:

```bash
nxs info react-app
```

## Available template packs

Templates are published as separate npm packages:

- `@nexicscript/template-web`
- `@nexicscript/template-backend`
- `@nexicscript/template-scripting`
- `@nexicscript/template-games`

Each pack is loaded only when the user selects one of its templates.

## Documentation

- [Brand guide](./docs/branding.md)
- [Command reference](./docs/commands.md)
- [Publishing notes](./docs/publishing.md)

## Publishing overview

NexicScript is prepared to be published in two parts:

- the main CLI package on npm
- separate template packages for each category

That keeps installations lighter and makes maintenance easier as the catalog grows.

## License

MIT
