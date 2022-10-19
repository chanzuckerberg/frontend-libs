# @chanzuckerberg/browserslist-config-edu

Shared [Browserslist](https://browsersl.ist) config for CZI's Education initiative.

## Prerequisites

For use with tools that take advantage of browserslist, such as [Babel](https://babeljs.io/docs/en/babel-preset-env), [create-react-app](https://create-react-app.dev/), [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat), [autoprefixer](https://github.com/postcss/autoprefixer), etc.

## Installation

Install by running

```sh
yarn add --dev @chanzuckerberg/browserslist-config-edu
```

## Usage

[Extend this package's config](https://github.com/browserslist/browserslist#shareable-configs) where you configure Browserslist (usually in either `package.json` or `.browserslistrc`)

```jsonc
// package.json

{
  "browserslist": [
    "extends @chanzuckerberg/browserslist-config-edu"
  ]
}
```
