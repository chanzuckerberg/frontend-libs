# @chanzuckerberg/eslint-plugin-eds

Shared React [ESLint](https://eslint.org/) plugin and config for CZI's Education initiative.

## Prerequisites

1. [EDS](https://github.com/chanzuckerberg/edu-design-system) is in use
2. [Install ESLint](https://eslint.org/docs/latest/user-guide/getting-started#installation-and-usage)
3. Run ESLint on CI (e.g. `npx eslint .`)
4. Consider running ESLint [in your editor(s)](https://eslint.org/docs/latest/user-guide/integrations).

## Installation

Install by running

```sh
yarn add --dev @chanzuckerberg/eslint-plugin-eds
```

## Usage

Add this package as a plugin in your [eslint configuration file](https://eslint.org/docs/latest/user-guide/configuring/configuration-files).

```jsonc
// .eslintrc.json
{
  "plugins": ["@chanzuckerberg/edu-react"]
}
```

Then extend the recommended config.

```js
// .eslintrc
{
  "extends": [
    "plugin:@chanzuckerberg/eslint-plugin-eds"
  ]
}
```

## Custom rules

The recommended config includes some custom rules that are enabled as part of the recommended config.

### no-h-tags

### no-p-tags
