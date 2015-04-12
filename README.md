# hapi-async-handler [![Build Status](https://travis-ci.org/ide/hapi-async-handler.svg?branch=master)](https://travis-ci.org/ide/hapi-async-handler)
Adds support for ES7 async functions to [hapi](http://hapijs.com/) route handlers

[![npm package](https://nodei.co/npm/hapi-async-handler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hapi-async-handler/)

# ES7 Async Functions

ES7 introduces [async functions](https://github.com/lukehoban/ecmascript-asyncawait), which are functions that support the `await` keyword and return promises. This hapi plugin adds a handler called `async` that allows you to write your route handlers using async functions. You can also use hapi-async-handler with [io.js](https://iojs.org/), generator functions (and the `yield` keyword), and [co](https://github.com/tj/co) today. There are examples of both styles of use shown below.

# Using hapi-async-handler

## Registering the Plugin

```javascript
var server = new Hapi.Server();
server.register([
  require('hapi-async-handler')
], function(error) { ... });
```

## Defining a Route Handler

Define an async function that receives `request` and `reply` like a normal route handler and assign it the `async` property of the route handler.

```javascript
server.route({
  method: 'GET',
  path: '/',
  handler: {
    // The "async" handler accepts an async function
    async: async function(request, reply) {
      // instapromise gives you promises from methods with Node-style callbacks
      require('instapromise');
      var fileContents = await fs.promise.readFile('example.txt', 'utf8');
      reply(fileContents);
    }
  }
});
```

For the `async` keyword to work, you will need to transform your source code with [regenerator](https://facebook.github.io/regenerator/) or a similar compiler.

### Using co

You can also use co and generator functions without any source-code transformations if you are using io.js.

```javascript
server.route({
  method: 'GET',
  path: '/',
  handler: {
    // co.wrap creates a function that returns a promise, just like an async function
    async: co.wrap(function*(request, reply) {
      require('instapromise');
      var fileContents = yield fs.promise.readFile('example.txt', 'utf8');
      reply(fileContents);
    })
  }
});
```
