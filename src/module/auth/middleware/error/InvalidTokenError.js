import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class InvalidTokenError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = "Token invalido.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
