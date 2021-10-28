import React from "react";

import PropTypes from "prop-types";

import Hero from "../hero/hero";
import EmptyHeroSpace from "../empty-hero-space/empty-hero-space";

import { HEROES_PER_TEAM } from "../../constants";

const Heroes = ({ heroes, editionMode, onRemoveHero, ...otherProps }) => {
  const content = [];

  for (let i = 0; i < HEROES_PER_TEAM; i++) {
    if (heroes[i]) {
      content.push(
        <div className="col" key={i}>
          <Hero
            hero={heroes[i]}
            editionMode={editionMode}
            onRemoveHero={() => onRemoveHero(i)}
          />
        </div>
      );
    } else {
      content.push(
        <div className="col" key={i}>
          <EmptyHeroSpace />
        </div>
      );
    }
  }

  return (
    <div className="row row-cols-3 row-cols-md-6 g-1" {...otherProps}>
      {content}
    </div>
  );
};

Heroes.propTypes = {
  heroes: PropTypes.array,
  editionMode: PropTypes.bool,
  onRemoveHero: PropTypes.func,
};

Heroes.defaultProps = {
  editionMode: false,
  onRemoveHero: () => {},
};

export default Heroes;
