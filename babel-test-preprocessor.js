var registerBabel = require('babel/register');

registerBabel({
  stage: 1,
  optional: ['runtime'],
});
