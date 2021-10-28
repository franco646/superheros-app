import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class TeamNotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Equipo no encontrado.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
