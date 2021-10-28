import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import HeroFinderResults from "../hero-finder-results/hero-finder-results";

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

describe("<HeroFinderResults />", () => {
  it("should map heroes", () => {
    render(<HeroFinderResults heroes={heroesMock} />);

    expect(screen.getAllByTestId("hero")).toHaveLength(2);
  });

  it("should call onSelectHero function with the hero as argument on clicking a hero", () => {
    const onSelectHeroMock = jest.fn();

    render(
      <HeroFinderResults heroes={heroesMock} onSelectHero={onSelectHeroMock} />
    );

    fireEvent.click(screen.getAllByTestId("hero")[0]);

    expect(onSelectHeroMock).toHaveBeenCalledTimes(1);
    expect(onSelectHeroMock).toHaveBeenCalledWith(heroesMock[0]);
  });
});
