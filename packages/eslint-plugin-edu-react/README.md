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

## Custom rules

The recommended config includes some custom rules that are enabled as part of the recommended config.

### no-create-ref-in-function-component

Don't allow `createRef` in function components, because `useRef` was probably intended.

```jsx
function MyComponent() {
  const ref1 = React.createRef(); // <- Violation
  const ref2 = React.useRef(); // <- Good
}
```

There are use cases for `createRef` in function components, and this rule can be suppressed for them.

### no-useless-key

Don't allow `key` attribute on JSX elements that are direct children of another, since the key is not needed.

```jsx
<ul>
  <li key="0">0</li> // <- Violation

  {things.map((thing) => (
    <li
      key={thing.id} // <- Good, since the element is part of an array
    >
      {thing.name}
    </li>
  ))}
</ul>
```

There are - rarely - use cases for specifying an unnecessary key. For these scenarios you can suppress the rule and leave a comment explaining why the key is necessary.

### use-effect-deps-presence

Require `useEffect` to have a deps array. Omitting deps is likely a mistake.

```js
useEffect(() => {
  // ...
}); // <- Violation, effect will run after every render

useEffect(() => {
  // ...
}, []); // <- Good, effect will run when deps change
```

There are use cases for omitting the deps array (resulting in the effect running after every render). For these cases suppress the rule.
