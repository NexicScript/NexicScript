# Publishing Notes

## npm packages

Publish the CLI and the template packs separately.

### Main CLI

- Package name: `nexicscript`
- Binary: `nxs`

### Template packages

- `@nexicscript/template-web`
- `@nexicscript/template-backend`
- `@nexicscript/template-scripting`
- `@nexicscript/template-games`

## GitHub organization

Recommended repository layout:

- one repository for the CLI
- one repository or release source for each template package, if you want them separated

## Release checklist

- verify the CLI menu
- verify `nxs install <category>`
- verify template creation
- verify `npm pack`
- verify the published README renders correctly
- verify the logo uses `Logo.png`

## Notes

The template loader falls back to the local workspace during development and uses installed package copies when published. The install command exists for users who want to prepare a category manually.
