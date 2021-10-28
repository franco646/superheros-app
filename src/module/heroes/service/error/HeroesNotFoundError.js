import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class HeroesNotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "No se encontraron héroes.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
