import React from "react";

const HeroDetailsList = ({ appearance, aliases, workBase }) => (
  <ul>
    <div className="row row-cols-2">
      <div className="col">
        <li>Peso: {appearance.weight}</li>
        <li>Altura: {appearance.height}</li>
        <li>Alias: {aliases.join()}</li>
      </div>
      <div className="col">
        <li>Color de ojos: {appearance["eye-color"]}</li>
        <li>Color de cabello: {appearance["hair-color"]}</li>
        <li>Lugar de trabajo: {workBase}</li>
      </div>
    </div>
  </ul>
);

HeroDetailsList.defaultProps = {
  appearance: { "eye-color": "" },
  aliases: [],
  workBase: "",
};

export default HeroDetailsList;
