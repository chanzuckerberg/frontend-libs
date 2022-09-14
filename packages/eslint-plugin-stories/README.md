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
  "extends": ["plugin:@chanzuckerberg/stories/recommended"]
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

| Name                            | Description                                                                                                | Config      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| csf-object-literal-or-function  | Enforce that stories are either an object literal or function.                                             | recommended |
| csf-v3-types                    | Enforce component story format (CSF) v3 stories have explicit TypeScript types where needed for inferrence | strict      |
| no-csf-v2                       | Use object stories (component story format v3) instead of functions.                                       | strict      |
| no-ext-resources-in-stories     | Prevent external resources from being loaded in stories.                                                   | recommended |
| no-new-components-without-story | Enforce that new components are created with a corresponding story                                         | recommended |
