import React from "react";

import PropTypes from "prop-types";

import Powerstats from "../powerstats/powerstats";

import { FiX, FiChevronUp } from "react-icons/fi";

import { Link } from "react-router-dom";

import "./hero.scss";

const Hero = ({ hero, editionMode, onRemoveHero, ...otherProps }) => (
  <div className="hero" {...otherProps} data-testid="hero">
    <div className="hero__image-container">
      {editionMode ? (
        <button
          className="hero__top-button p-1"
          type="button"
          data-testid="hero-remove-button"
          onClick={onRemoveHero}
        >
          <FiX className="m-0 p-0" />
        </button>
      ) : (
        <Link to={`/hero/${hero.id}`}>
          <button className="hero__top-button p-1" type="button">
            <FiChevronUp className="m-0 p-0" />
          </button>
        </Link>
      )}
      <img
        src={hero.image.url}
        className="img-fluid hero-image"
        alt={`${hero.name}`}
        width="400"
        height="400"
      />
      <h5 className="text-center w-100 fs-5 hero__name">{hero.name}</h5>
      <div className={`hero__image-shadow ${hero.biography.alignment}`} />
    </div>
    <div className="hero__body">
      <Powerstats
        powerstats={hero.powerstats}
        className="row row-cols-2 mx-0"
      />
      <hr className="my-1 mx-3" />
      <div className="d-inline-flex w-100 text-center my-1">
        <div className="w-100">{hero.appearance.height}</div>
        <div className="w-100">{hero.appearance.weight}</div>
      </div>
    </div>
  </div>
);

Hero.propTypes = {
  hero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    powerstats: PropTypes.objectOf(PropTypes.number),
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    biography: PropTypes.shape({
      alignment: PropTypes.string,
    }),
    appearance: PropTypes.shape({
      height: PropTypes.string,
      weight: PropTypes.string,
    }),
  }),
  editionMode: PropTypes.bool,
  onRemoveHero: PropTypes.func,
};

Hero.defaultProps = {
  editionMode: false,
  onRemoveHero: () => {},
};

export default Hero;
