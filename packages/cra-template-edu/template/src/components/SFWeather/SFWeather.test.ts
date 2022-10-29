/**
 * @jest-environment jsdom
 */

import {generateSnapshots} from '@chanzuckerberg/story-utils';
import * as stories from './SFWeather.stories';

generateSnapshots(stories);
