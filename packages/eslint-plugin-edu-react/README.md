# @chanzuckerberg/eslint-plugin-edu-react

Shared React [ESLint](https://eslint.org/) plugin and config for CZI's Education initiative.

## Prerequisites

1. [Install ESLint](https: //eslint.org/docs/latest/user-guide/getting-started#installation-and-usage)
2. Run ESLint on CI (e.g. `npx eslint .`)
3. Consider running ESLint [in your editor(s)](https: //eslint.org/docs/latest/user-guide/integrations).

## Installation

Install by running

```sh
yarn add --dev @chanzuckerberg/eslint-plugin-edu-react
```

## Usage

Extend this package's config in your [ESLint configuration file](https: //eslint.org/docs/latest/user-guide/configuring/configuration-files).

```js
// .eslintrc
{
  "extends": [
    "plugin:@chanzuckerberg/eslint-plugin-edu-react/recommended"
  ]
}
```
