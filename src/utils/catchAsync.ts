import { RequestHandler } from 'express';

/**
 * The `catchAsync` function is a TypeScript middleware that catches errors in asynchronous functions
 * and passes them to the next middleware.
 * @param {RequestHandler} fn - The `fn` parameter is a `RequestHandler` function that takes in three
 * parameters: `req` (the request object), `res` (the response object), and `next` (the next middleware
 * function in the chain).
 */
const catchAsync =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
