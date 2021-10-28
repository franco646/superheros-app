import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import Pagination from "../pagination/pagination";

describe("<Pagination />", () => {
  it("should create pages depending prop value", () => {
    render(<Pagination pages={3} />);

    expect(screen.getAllByTestId("page")).toHaveLength(3);
  });

  it("should call onPageChange function with the page number as argument on clicking a page", () => {
    const onPageChangeMock = jest.fn();

    render(<Pagination pages={3} onPageChange={onPageChangeMock} />);

    fireEvent.click(screen.getByText("2"));

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(2); // page number
  });

  it("should not change page on clicking previous button if the current page is the first", () => {
    const onPageChangeMock = jest.fn();

    render(<Pagination pages={3} onPageChange={onPageChangeMock} />);

    fireEvent.click(screen.getByTestId("previous-page-button"));

    expect(onPageChangeMock).toHaveBeenCalledTimes(0);
  });

  it("should not change page on clicking next button if the current page is the last", () => {
    const onPageChangeMock = jest.fn();

    render(<Pagination pages={3} onPageChange={onPageChangeMock} />);

    fireEvent.click(screen.getByText("3")); // clicking the last page
    fireEvent.click(screen.getByTestId("next-page-button")); // this event should not call the function

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should add active className to the current page", () => {
    render(<Pagination pages={3} />);

    expect(screen.getByText("1").parentElement.className).toContain("active");

    fireEvent.click(screen.getByText("2")); // change current page

    expect(screen.getByText("2").parentElement.className).toContain("active");
  });
});
