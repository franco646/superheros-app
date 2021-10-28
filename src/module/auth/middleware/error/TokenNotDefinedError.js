import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class TokenNotDefinedError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.FORBIDDEN,
    description = "El token no está definido.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
