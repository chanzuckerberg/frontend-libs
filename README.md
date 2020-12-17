# frontend-libs

![Tests](https://github.com/chanzuckerberg/frontend-libs/workflows/Tests/badge.svg)

Monorepo of frontend, TypeScript projects for use by the [Chan Zuckerberg Initiative](https://github.com/chanzuckerberg).

## Project goals

The packages in this monorepo are
- Useful between projects and initiatives at CZI
- Useful for other companies and the open-source community

Using a monorepo eases the maintenance burden by sharing configuration and tooling across packages. Overall goals for this project are
- Package are independent. Unrelated packages can live in this repository.
- Packages are built, linted, and tested at the top level (instead of individually).
- Packages can override config as necessary.
- Scripts are straightforward and standard, so that upgrading dependencies is as easy as possible. Limit custom processes.

## Usage

All packages are published separately as NPM packages, and should be installed and used as such. See each package's README.md file for installation and usage instructions.

## License

All code and packages in this repository are licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Developing

If you want to work on this project or contribute back to it, see [our wiki entry on developing in it](https://github.com/chanzuckerberg/frontend-libs/wiki/Developing).
