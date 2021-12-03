# eslint-plugin-stories

[ESLint](https://eslint.org/) rules for [Storybook stories](https://storybook.js.org/docs/react/get-started/whats-a-story).

In particular, these rules ensure that stories can be used in non-Storybook contexts. For example, for accessibility testing via [axe-storybook-testing](https://github.com/chanzuckerberg/axe-storybook-testing), or visual regression testing via [percy-storybook](https://github.com/percy/percy-storybook).

## Installation

Install @chanzuckerberg/eslint-plugin-stories with your favorite package manager. With yarn, that would look like

```sh
yarn add --dev @chanzuckerberg/eslint-plugin-stories
```

## Usage

Add @chanzuckerberg/stories as a plugin in your eslint configuration file.

```json
// .eslintrc.json
{
  "plugins": ["@chanzuckerberg/stories"]
}
```

Then you can either extend the recommended config to turn on all the rules

```json
// .eslintrc.json
{
  "extends": [
    "plugin:@chanzuckerberg/stories/recommended"
  ]
}
```

or configure the rules individually

```json
// .eslintrc.json
{
  "rules": {
    "@chanzuckerberg/stories/no-ext-resources-in-stories": "warn"
  }
}
```

## Rules

Name                         | Description
---------------------------- | -----------
no-ext-resources-in-stories  | Prevent external resources from being loaded in stories.
