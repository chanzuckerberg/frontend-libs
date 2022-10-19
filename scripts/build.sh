#!/bin/bash

# Build everything with tsc, including test files. We only really want non-test files, but I have
# not found a good way build project references while excluding tests files. In particular the
# `--project` and `--build` options can't be used together.
#
# If we find a good way to do that, we should be able to remove this script with a simple build
# command.
yarn build:ts

# Remove test files and their declarations.
npx rimraf \
  'packages/*/build/**/__tests__' \
  'packages/*/build/**/*.stories.*' \
  'packages/*/build/**/*.spec.*' \
  'packages/*/build/**/*.test.*' \
  'packages/*/build/**/*.ts.snap'
