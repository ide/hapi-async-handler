var assert = require('assert');

exports.register = function(server, options, next) {
  server.handler('async', function(route, options) {
    var asyncHandler = options;
    assert.equal('function', typeof asyncHandler, 'The async route handler must be a function');

    return function(request, reply) {
      asyncHandler.call(this, request, reply).catch(function(error) {
        if (error instanceof Error) {
          var {name, message, stack} = error;
          request.log(['error', 'uncaught'], {name, message, stack});
        } else {
          request.log(['error', 'uncaught'], {name: 'Error', message: error});
          error = new Error(error);
        }
        reply(error);
      });
    };
  });

  next();
};

exports.register.attributes = {
  name: 'hapi-async-handler',
  version: '1.0.3',
};
