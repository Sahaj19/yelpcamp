function wrapAsync(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch((err) => next(err));
  };
}

module.exports = wrapAsync;

/*This Node.js code defines 
a utility function wrapAsync
to wrap asynchronous route handlers,
handling errors and passing
them to the next middleware.*/
