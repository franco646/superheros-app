import BaseError from "../../../error/baseError.js";
import httpStatusCodes from "../../../error/httpStatusCodes.js";

export default class HeroIdNotDefined extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "ID de héroe no definido",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
