import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class TokenExpiredError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = "Token caducado.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
