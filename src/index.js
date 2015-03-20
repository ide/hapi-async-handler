var assert = require('assert');

exports.register = function(server, options, next) {
  server.handler('async', function(route, options) {
    var asyncHandler = options;
    assert.equal('function', typeof asyncHandler, 'The async route handler must be a function');

    return function(request, reply) {
      asyncHandler(request, reply).catch(function(error) {
        var {name, message, stack} = error;
        request.log(['error', 'uncaught'], {name, message, stack});
        reply(error instanceof Error ? error : new Error(error));
      });
    };
  });

  next();
};

exports.register.attributes = {
  name: 'hapi-async-handler',
  version: '1.0.0',
};
