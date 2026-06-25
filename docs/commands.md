# Command Reference

## `nxs help`
Show the terminal help screen.

## `nxs templates`
Open the interactive picker.

Flow:

1. Select a category.
2. Select a template.
3. NexicScript loads the category pack if needed.
4. Choose the destination folder.

## `nxs create <template>`
Create a project directly from a known template name.

Examples:

```bash
nxs create web-basic
nxs create react-app
nxs create node-api
```

The `node-api` template asks for an API style before generating files:

- REST
- GraphQL

## `nxs list`
Show all available categories, templates, and add-ons.

Examples:

```bash
nxs list
nxs list --category backend
nxs list web
```

## `nxs list add`
Show only add-ons that expand existing projects.

Examples:

```bash
nxs list add
```

## `nxs add <addon>`
Add extra folders and files to an existing project without removing what is already there.

Examples:

```bash
nxs add testing
nxs add docs
nxs add docker
nxs add ci-cd
```

## `nxs install <category>`
Install a template category pack before creating a project.

Examples:

```bash
nxs install web
nxs install backend
nxs install scripting
nxs install games
nxs install all
```

This command prepares the category pack so it can be used right away with `nxs create` or the menu flow.

## `nxs info <template>`
Show details for a template.

The command includes:

- template name
- version
- author
- category
- package name
- description

Example:

```bash
nxs info web-basic
```

## Error handling

If a user types an unknown command or an invalid template name, NexicScript prints a short friendly explanation instead of a raw stack trace.

It also points users toward:

- `nxs list`
- `nxs list add`
- `nxs help`
- `contact@nexicscript.org`
