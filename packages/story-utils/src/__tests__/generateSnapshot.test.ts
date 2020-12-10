/**
 * @jest-environment jsdom
 */

import generateSnapshot from "../generateSnapshot";

describe("auto generate snapshots", () => {
  generateSnapshot("packages/story-utils/**/*.stories.*");
});
