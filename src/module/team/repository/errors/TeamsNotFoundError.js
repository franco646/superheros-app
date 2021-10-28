import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class TeamsNotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Equipos no encontrados.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
