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
    "@chanzuckerberg/stories/no-jest-in-stories": "warn",
    "@chanzuckerberg/stories/no-top-level-story-args": "warn",
    "@chanzuckerberg/stories/stories-default-export": "warn"
  }
}
```

## Rules

Name                    | Description
----------------------- | -----------
no-ext-resources-in-stories  | Prevent external resources from being loaded in stories.
no-jest-in-stories      | Prevent Jest functions from being used in stories, since they can't run in non-Jest environments.
no-story-decorators     | Don't allow the use of `decorators` at the component or story level. Not allowing these makes it easier to re-use the stories outside of Storybook.
no-top-level-story-args | Don't allow "args" to be defined in the default export of a stories file. Not allowing those makes it easier to re-use the stories in environments where Storybook is not present.
stories-default-export  | Enforce that required properties are present in the default export of a stories file.
