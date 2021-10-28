import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import { HEROES_PER_TEAM } from "../../constants";

import Heroes from "../heroes/heroes";

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

describe("<Heroes />", () => {
  it("should map heroes and fill in the remaining spaces", () => {
    render(<Heroes heroes={heroesMock} />);

    expect(screen.getAllByTestId("hero")).toHaveLength(heroesMock.length);
    expect(screen.getAllByTestId("empty-hero-space")).toHaveLength(
      HEROES_PER_TEAM - heroesMock.length
    );
  });

  it("should call onRemoveHero function with the hero index as argument on clicking remove", () => {
    const onRemoveHeroMock = jest.fn();

    render(
      <Heroes
        heroes={heroesMock}
        editionMode={true} // remove buttons are only available in edit mode
        onRemoveHero={onRemoveHeroMock}
      />
    );

    fireEvent.click(screen.getAllByTestId("hero-remove-button")[0]);

    expect(onRemoveHeroMock).toHaveBeenCalledTimes(1);
    expect(onRemoveHeroMock).toHaveBeenCalledWith(0); // hero index
  });
});
