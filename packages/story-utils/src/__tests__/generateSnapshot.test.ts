/**
 * @jest-environment jsdom
 */

import generateSnapshots from '../generateSnapshots';
import * as stories from './__mock_stories__/foo.stories';

// We should see snapshots in the subdirectory
describe('auto generate snapshots for bar', () => {
  generateSnapshots(stories);
});
