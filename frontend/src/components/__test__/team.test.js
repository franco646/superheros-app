import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import Team from "../team/team";

const teamMock = {
  id: 1,
  name: "team test",
  averages: {},
  heroes: [
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
  ],
};

describe("<Team />", () => {
  it("should call onRemoveHero function with the hero index as argument on clicking remove hero", () => {
    const onRemoveHeroMock = jest.fn();

    render(
      <Team
        editionMode={true}
        team={teamMock}
        onRemoveHero={onRemoveHeroMock}
      />
    ); // remove hero button only available on edition mode

    fireEvent.click(screen.getByTestId("hero-remove-button"));

    expect(onRemoveHeroMock).toHaveBeenCalledTimes(1);
    expect(onRemoveHeroMock).toHaveBeenCalledWith(0); // hero index
  });

  it("should add border-danger className if isInvalid prop is true", () => {
    render(<Team team={teamMock} isInvalid={true} />);

    expect(screen.getByTestId("team").className).toContain("border-danger");
  });
});
