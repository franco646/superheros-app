import InvalidTokenError from "./error/InvalidTokenError.js";
import TokenExpiredError from "./error/TokenExpireError.js";
import TokenNotDefinedError from "./error/TokenNotDefinedError.js";

export default class AuthMiddleware {
  constructor(jwt) {
    this.jwt = jwt;
  }

  verifyToken(req, res, next) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        throw new TokenNotDefinedError("Token not defined.");
      }
      this.jwt.verify(
        token.replace("Bearer ", ""),
        process.env.TOKEN_SECRET,
        (error) => {
          if (error) {
            if (error instanceof this.jwt.TokenExpiredError) {
              throw new TokenExpiredError("Token expired.");
            }
            throw new InvalidTokenError("Invalid token.");
          }
        }
      );
      return next();
    } catch (error) {
      next(error);
    }
  }
}
