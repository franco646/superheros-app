import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import { FETCHED_HEROES_LIMIT } from "../../constants";

import HeroFinderPagination from "../hero-finder-pagination/hero-finder-pagination";

describe("<HeroFinderPagination />", () => {
  it("should create pages depending on the number of heroes", async () => {
    const pagesToCreate = 3;
    const numberOfHeroes = pagesToCreate * FETCHED_HEROES_LIMIT;

    render(<HeroFinderPagination />, {
      initialState: { heroes: { count: numberOfHeroes } },
    });

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getAllByTestId("page")).toHaveLength(pagesToCreate);
  });

  it("should return null if the number of pages is less than or equal to one", () => {
    const pagesToCreate = 1;
    const numberOfHeroes = pagesToCreate * FETCHED_HEROES_LIMIT;

    render(<HeroFinderPagination />, {
      initialState: { heroes: { count: numberOfHeroes } },
    });

    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("should call onPageChange function with the page number on clicking a page", () => {
    const pagesToCreate = 2;
    const numberOfHeroes = pagesToCreate * FETCHED_HEROES_LIMIT;

    const onPageChangeMock = jest.fn();

    render(<HeroFinderPagination onPageChange={onPageChangeMock} />, {
      initialState: { heroes: { count: numberOfHeroes } },
    });

    fireEvent.click(screen.getByText("2"));

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
