import HttpExceptions from '../utils/exceptions/exception.http.js';

export default function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong. Contact admin';

  res.status(status).json({
    success: false,
    status,
    message,
  });
}
