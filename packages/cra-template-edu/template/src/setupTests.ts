import {setGlobalConfig} from '@storybook/testing-react';
// @ts-expect-error JS file, which TS is configured to not analyze.
import * as globalStorybookConfig from '../.storybook/preview';
import '@testing-library/jest-dom';

setGlobalConfig(globalStorybookConfig);
