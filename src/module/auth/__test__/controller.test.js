import UserValidationError from "../Controller/error/UserValidationError.js";
import { AuthController } from "../module.js";

const jwtMock = {
  sign: jest.fn(() => "this is a jwt test token"),
};

const controller = new AuthController(jwtMock);

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a token if the email and password are correct", () => {
    const endMock = jest.fn();
    const jsonMock = jest.fn(() => ({ end: endMock }));
    const statusMock = jest.fn(() => ({ json: jsonMock }));

    const userMock = {
      email: "challenge@alkemy.org",
      password: "react",
    };

    controller.login({ body: userMock }, { status: statusMock }, () => {});

    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith({
      token: "this is a jwt test token",
    });
  });

  it("should throw a user validation error if the email or password are incorrect", () => {
    const nextMock = jest.fn();

    const userMock = {
      email: "incorrect@email.com",
      password: "incorrect",
    };

    controller.login({ body: userMock }, {}, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(new UserValidationError());
  });
});
