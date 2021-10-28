import React from "react";

import PropTypes from "prop-types";

import Hero from "../hero/hero";

const HeroFinderResults = ({ heroes, onSelectHero }) => {
  return (
    <div className="row row-cols-4 row-cols-sm-5 row-cols-md-6 g-2">
      {heroes.map((hero, i) => (
        <div className="col" key={i}>
          <Hero hero={hero} onClick={() => onSelectHero(hero)} />
        </div>
      ))}
    </div>
  );
};

HeroFinderResults.propTypes = {
  heroes: PropTypes.array,
  onSelectHero: PropTypes.func,
};

export default HeroFinderResults;
