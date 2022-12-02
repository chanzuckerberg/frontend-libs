# Changelog

## Unreleased

## 3.0.10 (2022-12-02)

- [fix] Update dependencies

## 3.0.9 (2022-10-28)

- [maintenance] Updated dependencies

## 3.0.8 (2022-07-07)

No updates. Adding new version so Lerna will publish a new release. After this, we shouldn't get any more versions that don't actually have any updates.

## 3.0.7 (2022-07-07)

No updates. Another package was updated. Is there a way to prevent Lerna from publishing new versions just because another package changed?

## 3.0.6 (2022-07-07)

- [fix] Update dependencies

## 3.0.5 (2022-05-09)

- [fix] Fix typing of the stories import file passed to `generateSnapshots` - see https://github.com/chanzuckerberg/edu-design-system/pull/1044/files/d6305f5b156d8dbd7e895af50169cbf3c12aa864#r867242961

## 3.0.4 (2022-01-25)

- [fix] Wait a bit after running play functions before taking snapshots in `generateSnapshots`, to ensure async things have happened - [#26](https://github.com/chanzuckerberg/frontend-libs/pull/26)

## 3.0.3 (2022-01-25)

- [fix] Pass the correct `canvasElement` to stories with play functions in `generateSnapshots` - [#25](https://github.com/chanzuckerberg/frontend-libs/pull/25)

## 3.0.2 (2021-12-03)

No updates. Just Lerna being Lerna. Another package was updated.

## 3.0.1 (2021-11-29)

- [maintenance] Revert https://github.com/chanzuckerberg/frontend-libs/pull/19 and go back to CommonJS modules (technicalyl this is breaking, but there are no downloads of v3.0.0)

## 3.0.0 (2021-11-29)

- [breaking] Output ES2019 instead of ES6 - [#19](https://github.com/chanzuckerberg/frontend-libs/pull/19)
- [breaking] Output [ES modules](https://nodejs.org/api/esm.html) instead of CommonJS - [#19](https://github.com/chanzuckerberg/frontend-libs/pull/19)
- [breaking] The `argOverrides` option for `generateSnapshot` has been removed - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)
- [breaking] Added new peer dependency on any version of React. This was already implicit (since React testing-library is being used) - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)
- [breaking] `prepareStory` has been removed. @storybook/testing-react can be used instead - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)
- [breaking] `getStories` has been removed, to simplify supporting Storybook 6.4. It's not used much - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)
- [breaking] Rename the `getSnapshot` option of `generateSnapshot` to `getElement`, to better describe what it is for - [#18](https://github.com/chanzuckerberg/frontend-libs/pull/18)

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
