import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class UserValidationError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.FORBIDDEN,
    description = "Email o contraseña incorrectos.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
