# Changelog

## Unreleased

## 3.1.0 (2022-01-25)

**Same changelog entry as v3.0.2. I mistakenly published that version, and republished as the correct one - v3.1.0.**

- [new] Add csf-v3-types rule

## 3.0.2 (2022-01-25)

**Note I made a mistake on the versioning, and this should have been 3.1.0**

- [new] Add csf-v3-types rule

## 3.0.1 (2021-12-03)

- [fix] Wrong buld output was published in v3.0.0

## 3.0.0 (2021-12-03)

- [breaking] Remove `no-jest-in-stories` [#22](https://github.com/chanzuckerberg/frontend-libs/pull/22)
- [breaking] Remove `stories-default-export` [#22](https://github.com/chanzuckerberg/frontend-libs/pull/22)
- [fix] Tweak failure message for `no-ext-resources-in-stories` [#22](https://github.com/chanzuckerberg/frontend-libs/pull/22)
- [new] Add `no-csf-v2` rule [#22](https://github.com/chanzuckerberg/frontend-libs/pull/22)

## 2.0.1 (2021-11-29)

- [maintenance] Revert https://github.com/chanzuckerberg/frontend-libs/pull/19 and go back to CommonJS modules (technicalyl this is breaking, but there are no downloads of v3.0.0)

## 2.0.0 (2021-11-29)

- [breaking] Output ES2019 instead of ES6 - [#19](https://github.com/chanzuckerberg/frontend-libs/pull/19)
- [breaking] Output [ES modules](https://nodejs.org/api/esm.html) instead of CommonJS - [#19](https://github.com/chanzuckerberg/frontend-libs/pull/19)
- [breaking] Removed the `no-story-decorators` rule, because @storybook/testing-react will find and use decorators - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)
- [breaking] Removed the `no-top-level-story-args` rule, because @storybook/testing-react will find and use args at any level - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)

## 1.2.2 (2021-08-13)

- Update dependencies

## 1.2.1 (2021-03-04)

- [maintenance] Upgrade dependencies - [#14](https://github.com/chanzuckerberg/frontend-libs/pull/14)

## 1.2.0 (2021-02-16)

- [maintenance] Run `update-ts-references` on CI for Windows - [#11](https://github.com/chanzuckerberg/frontend-libs/pull/11)
- [new] Added the `no-story-decorators` rule - [#12](https://github.com/chanzuckerberg/frontend-libs/pull/12)

## 1.1.3 (2020-12-16)

Nothing in this release... Published a new version because another package in this monorepo was published, and Lerna publishes either everything, or nothing.

## 1.1.2 (2020-12-04)

- Updated dependencies

## 1.1.1 (2020-12-03)

- Updated dependencies

## 1.1.0 (2020-11-18)

- [new] Added the `no-ext-resources-in-stories` rule

## 1.0.1 (2020-11-13)

- Updated homepage in package.json so that it shoes up on npmjs.com

## 1.0.0 (2020-11-12)

Initial release! 🎉
