import UserValidationError from "./error/UserValidationError.js";

export default class AuthController {
  constructor(jwt) {
    this.jwt = jwt;
  }

  configureRoutes(app) {
    const ROUTE = "/auth";

    app.post(`${ROUTE}/login`, this.login.bind(this));
  }

  login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (email === "challenge@alkemy.org" && password === "react") {
        const payload = { email };
        const accessToken = this.jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: 86400, // 24 hours in seconds
        });
        return res.status(200).json({ token: accessToken }).end();
      }
      throw new UserValidationError("User validation error.");
    } catch (error) {
      next(error);
    }
  }
}
