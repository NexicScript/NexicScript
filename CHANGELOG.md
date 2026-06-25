# Changelog

## 2.0.0 - Expanded template catalog

### Added

- Added `nxs list` to show all categories, templates, and add-ons.
- Added `nxs list add` to show only add-ons for existing projects.
- Added `nxs add <addon>` to expand an existing project without replacing current files.
- Added guided template selection for `node-api` with REST and GraphQL modes.
- Added new template categories for mobile, data, and advanced workflows.
- Added new templates for Vue, Next.js, Svelte, TypeScript APIs, microservices, React Native, Flutter, Unity, Godot, Pygame, data science, ML models, Chrome extensions, Electron, monorepos, and npm libraries.
- Added friendly CLI error handling so users see clear NexicScript messages instead of raw stack traces.

### Changed

- Updated the CLI entrypoint to a cleaner command router.
- Updated the public README and command reference to match the new workflow.
- Reorganized the catalog so template packages stay separated by category.
- Bumped the main package to `2.0.0` to reflect the size of this release.

## 1.1.4 - Category install command

### Added

- Added `nxs install <category>` to install a template pack on demand.
- Added support for installing all categories with `nxs install all`.
- Improved category matching so users can type friendly names like `web`, `backend`, or the package name.

### Changed

- Clarified the public README and command documentation around category installation.
- Kept `nxs templates` and `nxs create` compatible with automatic category loading.

## 1.1.3 - Public release prep

### Changed

- Reworked the public README to better guide new users.
- Added a brand guide for the official NexicScript logo and color palette.
- Added command and publishing documentation.
- Removed the separate `.nxs` icon guide.

### Notes

This release focuses on public-facing documentation and organization readiness for npm and GitHub publishing.

## 1.0.0

### Added

- Initial NXS architecture.
- Template system added.
- web-basic template added.
