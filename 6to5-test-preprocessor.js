var _ = require('lodash-node');
var register6to5 = require('6to5/register');

register6to5({
  experimental: true,
  optional: ['selfContained'],
});
