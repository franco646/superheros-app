import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class HeroNotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "No se encontró el héroe.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
