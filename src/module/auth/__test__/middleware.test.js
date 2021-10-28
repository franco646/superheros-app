import TokenNotDefinedError from "../middleware/error/TokenNotDefinedError";
import { AuthMiddleware } from "../module";

describe("AuthMiddleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should verify token and call next if the token is correct", () => {
    const nextMock = jest.fn();
    const jwtMock = {
      verify: jest.fn(), // correct token response
    };

    const middleware = new AuthMiddleware(jwtMock);

    middleware.verifyToken(
      { headers: { authorization: "test token" } },
      {},
      nextMock
    );

    expect(jwtMock.verify).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith();
  });

  it("should throw an error if token is not defined", async () => {
    const nextMock = jest.fn();

    const middleware = new AuthMiddleware();

    middleware.verifyToken({ headers: {} }, {}, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(new TokenNotDefinedError());
  });
});
