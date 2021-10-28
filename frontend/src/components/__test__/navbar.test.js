import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import Navbar from "../navbar/navbar";

describe("<Navbar />", () => {
  it("should remove token on clicking logout button", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByTestId("logout-button"));

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });
});
