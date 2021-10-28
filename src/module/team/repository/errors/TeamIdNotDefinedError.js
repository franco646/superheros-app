import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class TeamIdNotDefinedError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "El id del equipo no está definido",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
