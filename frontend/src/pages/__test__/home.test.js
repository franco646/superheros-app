import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import Home from "../home/home";

import { TEAMS_FILTERS } from "../../constants";

const teamsMock = [
  {
    id: 1,
    name: "test team 1",
    averages: { total: 100 },
    heroes: [],
  },
  {
    id: 2,
    name: "test team 2",
    averages: { total: 50 },
    heroes: [],
  },
];

const server = setupServer(
  rest.get("/teams", (req, res, ctx) => {
    return res(ctx.json({ teams: teamsMock }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Home />", () => {
  it("should show spinner while is fetching teams", () => {
    render(<Home />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should fetch teams from API and show them", async () => {
    render(<Home />);

    await waitFor(() =>
      expect(screen.getAllByTestId("team")).toHaveLength(teamsMock.length)
    );
  });

  it("should show an alert if there is an error", () => {
    render(<Home />, {
      initialState: { error: { error: "this is a test error ^_^" } },
    });

    expect(screen.getByTestId("alert")).toBeInTheDocument();
  });

  it("should sort teams on changing filter", async () => {
    render(<Home />);

    await waitFor(
      () =>
        expect(screen.getAllByTestId("team")[0].textContent).toContain(
          "test team 1"
        ) // team with the highest score should be first
    );

    fireEvent.change(screen.getByTestId("score-team-select"), {
      target: { value: TEAMS_FILTERS.LOWEST_SCORE },
    }); // change filter

    await waitFor(
      () =>
        expect(screen.getAllByTestId("team")[0].textContent).toContain(
          "test team 2"
        ) // team with the lowest score should be first
    );
  });
});
