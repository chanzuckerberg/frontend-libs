import {setGlobalConfig} from '@storybook/testing-react';
// @ts-expect-error JS file, which TS is configured to not analyze.
import * as globalStorybookConfig from '../.storybook/preview';
// Custom Jest matchers for React testing library, such as `toBeDisabled` and `toHaveFocus`. For a
// full list see https://github.com/testing-library/jest-dom.
import '@testing-library/jest-dom';

// Pull in our global Storybook config, so that tests based on stories get any global decorators we
// have set up.
setGlobalConfig(globalStorybookConfig);
