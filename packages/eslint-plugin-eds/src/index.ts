import noHTags from './rules/no-h-tags';
import noPTags from './rules/no-p-tags';

const rules = {
  'no-h-tags': noHTags,
  'no-p-tags': noPTags,
};

const recommended = {
  plugins: ['@chanzuckerberg/eds'],
  rules: {
    '@chanzuckerberg/eds/no-h-tags': 'warn',
    '@chanzuckerberg/eds/no-p-tags': 'warn',
  },
};

module.exports = {
  rules,
  configs: {
    recommended,
  },
};
