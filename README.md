# frontend-libs

![Tests](https://github.com/chanzuckerberg/frontend-libs/workflows/Tests/badge.svg)

Monorepo of frontend, TypeScript projects for use by the [Chan Zuckerberg Initiative](https://github.com/chanzuckerberg).

## Project goals

The packages in this monorepo are
- Useful between projects and initiatives at CZI
- Useful for other companies and the open-source community

Using a monorepo eases the maintenance burden by sharing configuration and tooling across packages. Overall goals for this project are
- Package are independent. Unrelated packages can live in this repository.
- Packages are built, linted, and tested at the top level (instead of individually), to keep things simpler.
- Packages can override config as necessary.
- Scripts are straightforward and standard, so upgrading dependencies is as easy as possible. Limit custom processes.

## Usage

All packages are published separately as NPM packages, and should be installed and used as such. See each package's README.md file for installation and usage instructions.

## Packages

- [eslint-config-edu-js](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/eslint-config-edu-js)
- [eslint-config-edu-react](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/eslint-config-edu-react)
- [eslint-config-edu-ts](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/eslint-config-edu-ts)
- [eslint-plugin-stories](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/eslint-plugin-stories)
- [prettier-config-edu](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/prettier-config-edu)
- [remix-utils](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/remix-utils)
- [story-utils](https://github.com/chanzuckerberg/frontend-libs/tree/main/packages/story-utils)

## License

All code and packages in this repository are licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Developing and Publishing

If you want to work on this project or contribute back to it, see the wiki entries on [Developing](https://github.com/chanzuckerberg/frontend-libs/wiki/Developing) and [Publishing Releases](https://github.com/chanzuckerberg/frontend-libs/wiki/Publishing-releases).
