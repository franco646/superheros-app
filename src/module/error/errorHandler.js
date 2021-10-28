import BaseError from "./baseError.js";
import httpStatusCodes from "./httpStatusCodes.js";

function logError(err) {
  console.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(error, req, res, next) {
  if (isOperationalError()) {
    return res.status(httpStatusCodes.OK).send(error.message);
  }
  return res.status(error.statusCode || 500).send(error.message);
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

export { logError, returnError, logErrorMiddleware };
