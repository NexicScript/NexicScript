# Command Reference

## `nxs templates`
Open the interactive menu.

Flow:

1. Select a category.
2. Select a template.
3. NexicScript loads the correct template pack if needed.
4. Choose the destination folder.

## `nxs create <template>`
Create a project directly from a known template name.

Examples:

```bash
nxs create web-basic
nxs create react-app
nxs create node-api
```

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
