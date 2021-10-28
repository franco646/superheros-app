import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class TeamNotDefinedError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "Equipo no definido.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
