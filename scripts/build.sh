#!/bin/bash

# Build everything with tsc, including test files. We only really want non-test files. But I have
# not found a good way to not compile test files to JS while still type-checking them.
#
# If we find a good way to do that, we should be able to remove this script with a simple build
# command.
yarn build:ts

# Remove test files and their declarations.
npx rimraf \
  'packages/*/build/**/__tests__' \
  'packages/*/build/**/*.test.*' \
  'packages/*/build/**/*.spec.*' \
  'packages/*/build/**/*.stories.*'
