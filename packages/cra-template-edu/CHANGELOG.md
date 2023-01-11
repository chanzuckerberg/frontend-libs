# Changelog

## Unreleased

## 1.2.2 (2023-01-11)

- [fix] Update dependencies

## 1.2.1 (2022-12-02)

- [fix] Use Node 18.12.1 by default
- [fix] Cancel previous CI runs

## 1.2.0 (2022-11-24)

- [fix] Remove unnecessary eslint-config-prettier extending (eslint-plugin-prettier already extends it)
- [fix] Specify prettier config in package.json field, instead of separate prettier.config.js file
- [fix] Upgrade EDS from 6.0.1 to 7.0.0
- [fix] Upgrade msw to 0.49 and typescript to 4.9.3
- [fix] Upgrade prettier from 2.7.1 to 2.8.0
- [new] Add eslint-plugin-testing-library

## 1.1.0 (2022-11-15)

- [new] Add example block for Chromatic to the Github Action workflow
- [fix] Update depenendencies
- [fix] Ensure TypeScript in generated apps is limited to v4.8.x, to work with msw (which for some reason has a tight dependency... see https://github.com/mswjs/msw/issues/1462)
- [fix] Limit msw version to the one we created `mockServiceWorker.js` with

## 1.0.3 (2022-11-03)

- [fix] Use an async function in example API call
- [fix] Add inline comments to explain routing, data fetching, testing, etc.
- [fix] Resolves some warnings coming from EDS during builds

## 1.0.2 (2022-11-01)

- [fix] Fix component name (the About component's function was named App...)

## 1.0.1 (2022-11-01)

- [fix] Add some more explanatory comments to generated code
- [fix] Move Navigation component out of the routing component and into pages, where it belongs
- [fix] Update @chanzuckerberg/eds to v6.0.0

## 1.0.0 (2022-10-31)

- Hello, World!
