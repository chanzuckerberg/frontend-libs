# Changelog

## Unreleased

- [breaking] Output ES2019 instead of ES6 - [#19](https://github.com/chanzuckerberg/frontend-libs/pull/19)
- [breaking] Output [ES modules](https://nodejs.org/api/esm.html) instead of CommonJS - [#19](https://github.com/chanzuckerberg/frontend-libs/pull/19)
- [breaking] The `argOverrides` option for `generateSnapshot` has been removed
- [breaking] Added new peer dependency on any version of React. This was already implicit (since React testing-library is being used)
- [breaking] `prepareStory` has been removed. @storybook/testing-react can be used instead
- [breaking] `getStories` has been removed, to simplify supporting Storybook 6.4. It's not used much
- [breaking] Rename the `getSnapshot` option of `generateSnapshot` to `getElement`, to better describe what it is for

## 2.1.0 (2021-08-13)
- Update dependencies
- [new] Add `wait` helper - [#17](https://github.com/chanzuckerberg/frontend-libs/pull/17)
- [fix] Push generating snapshots to the end of the event loop in `generateSnapshots` - [#17](https://github.com/chanzuckerberg/frontend-libs/pull/17)

## 2.0.0 (2021-03-04)

- [breaking] Change the `generationSnapshot` option `disabled` to `skip` - [#13](https://github.com/chanzuckerberg/frontend-libs/pull/13)
- [maintenance] Upgrade dependencies - [#14](https://github.com/chanzuckerberg/frontend-libs/pull/14)

## 1.2.1 (2021-02-16)

- [maintenance] Run `update-ts-references` on CI for Windows - [#11](https://github.com/chanzuckerberg/frontend-libs/pull/11)

## 1.2.0 (2020-12-16)

- [new] Added `generateSnapshots` helper - [#8](https://github.com/chanzuckerberg/frontend-libs/pull/8)

## 1.1.0 (2020-12-04)

- [new] Validate story metadata when finding stories with `getStories`

## 1.0.0 (2020-12-03)

Initial release! 🎉
