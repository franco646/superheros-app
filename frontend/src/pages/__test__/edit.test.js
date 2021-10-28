import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import { Route } from "react-router-dom";

import Edit from "../edit/edit";

const heroesMock = [
  {
    id: 69,
    name: "Batman",
    powerstats: {
      intelligence: 81,
      strength: 40,
      speed: 29,
      durability: 55,
      power: 63,
      combat: 90,
    },
    biography: {
      alignment: "good",
    },
    appearance: {
      height: "178 cm",
      weight: "77 kg",
    },
    image: {
      url: "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg",
    },
  },
  {
    id: 71,
    name: "Batman II",
    powerstats: {
      intelligence: 88,
      strength: 11,
      speed: 33,
      durability: 28,
      power: 36,
      combat: 100,
    },
    biography: {
      alignment: "good",
    },
    appearance: {
      height: "178 cm",
      weight: "79 kg",
    },
    image: {
      url: "https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg",
    },
  },
];

const teamMock = {
  id: 1,
  name: "team test",
  averages: {},
  heroes: heroesMock,
};

const server = setupServer(
  rest.get("/teams/:id", (req, res, ctx) => {
    return res(ctx.json({ team: teamMock }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Edit />", () => {
  it("should clear heroes from results on rendering", () => {
    render(<Edit />, { initialState: { heroes: { heroes: heroesMock } } });

    expect(screen.queryAllByTestId("hero")).toHaveLength(0);
  });

  it("should fetch the team if a team id is passed as parameter", async () => {
    render(
      <Route path="/edit/:teamId?">
        <Edit />
      </Route>,
      { route: "/edit/123" }
    );

    await waitFor(() =>
      expect(screen.getByTestId("team-name").textContent).toBe(teamMock.name)
    );
    expect(screen.getAllByTestId("hero")).toHaveLength(teamMock.heroes.length);
  });

  it("should show a spinner while is fetching the team", () => {
    render(
      <Route path="/edit/:teamId?">
        <Edit />
      </Route>,
      { route: "/edit/123" }
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
