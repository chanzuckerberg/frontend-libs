import '@testing-library/jest-dom';

// Polyfill `fetch` for node. Only needed because components in cra-template-edu use `fetch`, but
// Node doesn't implement it. If we ever remove the usage of `fetch`, also remove this.
import 'whatwg-fetch';
