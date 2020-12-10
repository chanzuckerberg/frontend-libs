/**
 * @jest-environment jsdom
 */

import generateSnapshot from '../generateSnapshot';
import * as storyFileExports from './__mock_stories__/foo.stories';

// We should see snapshots in the subdirectory
describe('auto generate snapshots for foo', () => {
  generateSnapshot(storyFileExports);
});
