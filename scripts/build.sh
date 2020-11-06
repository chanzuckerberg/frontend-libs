#!/bin/bash

# Remove all build files.
#
# Doing so actually defeats one of the purposes of using TypeScript project references, and it will
# make that step slower. For now we're not relying on project references for its performance
# characteristics, and we can go ahead and remove everything.
#
# If TypeScript compilation ever becomes a bottleneck, we should revisit this.
yarn clean

# Build everything with tsc.
#
# We only want declaration files (*.d.ts), since Babel is compiling the JavaScript. Unfortunately,
# there currently isn't a way to produce only declaration files with project references and tsc's
# `--build` flag. To work around that, we'll produce actual JavaScript along with the declaration
# files. We'll then delete everything we don't want, and let Babel reproduce them later.
#
# This is a hack, and if we can discover a better way of handling this, we should revisit this.
yarn build:ts

# Remove JavaScript files output by tsc.
#
# Babel will do its own JavaScript compilation later.
find packages -path "*/build/*.js" | xargs -I % rm %

# Remove declarations for test files, in case tsc produced any.
find packages \
  -path "*/build/*.test.d.ts" \
  -or -path "*/build/*.spec.d.ts" \
  -or -path "*/build/*.stories.d.ts" \
  | xargs -I % rm %

# Finally build the JavaScript with Babel.
yarn build:js
