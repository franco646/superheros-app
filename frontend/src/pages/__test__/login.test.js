import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import Login from "../login/login";

const tokenMock = "this is a test token :D";

const server = setupServer(
  rest.post("/auth/login", (req, res, ctx) => {
    return res(ctx.json({ token: tokenMock }));
  })
);

beforeAll(() => server.listen());
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Login />", () => {
  it("should show an alert if there is an user error message", () => {
    render(<Login />, {
      initialState: { auth: { errorMessage: "this is a test error >.<" } },
    });

    expect(screen.getByTestId("alert")).toBeInTheDocument();
  });

  it("should show an spinner while is the user is loggin in", async () => {
    render(<Login />, {
      initialState: { auth: { isAuthenticating: true } },
    });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should set token in local storage when login is successful", async () => {
    render(<Login />);

    await waitFor(() =>
      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "test@email.com" },
      })
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "password" },
      })
    );

    await waitFor(() => fireEvent.click(screen.getByTestId("login-button")));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(localStorage.setItem).toHaveBeenCalledWith("token", tokenMock)
    );
  });
});
