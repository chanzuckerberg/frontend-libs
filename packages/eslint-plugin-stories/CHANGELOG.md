# Changelog

## Unreleased

## 3.2.9 (2022-12-13)

- [fix] Correct changelog

## 3.2.8 (2022-12-13)

- [fix] Allow TS story files in `no-components-without-story` rule [#41](https://github.com/chanzuckerberg/frontend-libs/pull/41)

## 3.2.7 (2022-12-02)

- [fix] Update dependencies

## 3.2.6 (2022-11-24)

- [fix] Update dependencies

## 3.2.5 (2022-11-15)

- [maintenance] Updated dependencies

## 3.2.4 (2022-10-28)

- [maintenance] Updated dependencies

## 3.2.3 (2022-09-20)

- [new] Add `no-components-without-story` rule [#29](https://github.com/chanzuckerberg/frontend-libs/pull/29)

## 3.2.2 (2022-07-07)

- [fix] Handle `Template.bind(null)` case in csf-object-literal-or-function [#28](https://github.com/chanzuckerberg/frontend-libs/pull/28)

## 3.2.1 (2022-07-07)

- [fix] Fix error preventing the csf-object-literal-or-function rule from being found

## 3.2.0 (2022-07-07)

- [new] Add `csf-object-literal-or-function` rule [#27](https://github.com/chanzuckerberg/frontend-libs/pull/27)

## 3.1.1 (2022-05-09)

- Dependencies updated

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
