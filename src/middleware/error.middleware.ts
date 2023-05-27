import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.statusCode || res.statusCode || 500;
  res.status(status);
  const errorObject = {
    message: err.message,
    // stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
  };
  res.send(errorObject);
};

export { errorMiddleware }