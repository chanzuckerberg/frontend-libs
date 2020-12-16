/**
 * @jest-environment jsdom
 */

import generateSnapshots from '../generateSnapshots';
import * as snapshotTestStoryFile from './__mock_stories__/bar.stories';

// We should see snapshots in the subdirectory
describe('auto generate snapshots for bar', () => {
  generateSnapshots(snapshotTestStoryFile);
});
