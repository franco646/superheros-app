import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, waitFor } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import HeroFinder from "../hero-finder/hero-finder";

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

const server = setupServer(
  rest.get("/heroes/search/:searchParam", (req, res, ctx) => {
    return res(ctx.json({ count: heroesMock.length, heroes: heroesMock }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.setTimeout(30000);

describe("<HeroFinder />", () => {
  it("should fetch heroes from API and show them", async () => {
    render(<HeroFinder />);

    fireEvent.change(screen.getByTestId("heroes-search__input"), {
      target: { value: "batman" },
    });

    await waitFor(() => expect(screen.getAllByTestId("hero")).toHaveLength(2));
  });

  it("should remove the heroes that are already in the team from the results", async () => {
    const teamMock = [heroesMock[0]];

    render(<HeroFinder teamHeroes={teamMock} />, {
      initialState: { heroes: { heroes: heroesMock } },
    });

    expect(screen.getAllByTestId("hero")).toHaveLength(1);
    expect(screen.queryByText(heroesMock[0].name)).not.toBeInTheDocument();
    expect(screen.getByText(heroesMock[1].name)).toBeInTheDocument();
  });
});
