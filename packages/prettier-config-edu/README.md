# @chanzuckerberg/prettier-config-edu

Shared [Prettier](https://prettier.io) config for CZI's Education initiative.

## Prerequisites

1. [Install Prettier](https://prettier.io/docs/en/install.html)
2. Integrate with ESLint via [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
3. Run Prettier on CI (e.g. `prettier --check .`)
4. Consider running Prettier [in a precommit hook](https://prettier.io/docs/en/precommit.html) and/or [in your editor(s)](https://prettier.io/docs/en/editors.html)

## Installation

Install by running

```sh
npm install --save-dev @chanzuckerberg/prettier-config-edu
```

## Usage

Import the prettier config from this package and use it in your [Prettier config file](https://prettier.io/docs/en/configuration.html). Usually this is `prettier.config.js`.

```js
// prettier.config.js

module.exports = require('@chanzuckerberg/prettier-config-edu');
```
