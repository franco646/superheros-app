import React from "react";

import PropTypes from "prop-types";

import { FaBrain } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { BsLightningFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { RiSpeedMiniFill } from "react-icons/ri";
import { GiKnifeThrust } from "react-icons/gi";

import Stat from "../stat/stat";

import "./powerstats.scss";

const Powerstats = ({ powerstats, isTeamStats, ...otherProps }) => (
  <div className="row" {...otherProps}>
    <div className="col px-2">
      <Stat
        name="Inteligencia"
        value={powerstats.intelligence}
        isTeamStats={isTeamStats}
      >
        <FaBrain
          size={isTeamStats ? 14 : 10.6}
          className="stat__icon"
          fill="#00b8ce"
        />
      </Stat>
    </div>
    <div className="col px-2">
      <Stat name="Fuerza" value={powerstats.strength} isTeamStats={isTeamStats}>
        <GiBiceps
          size={isTeamStats ? 14 : 10.6}
          className="stat__icon"
          fill="#c23a3a"
        />
      </Stat>
    </div>
    <div className="col px-2">
      <Stat name="Velocidad" value={powerstats.speed} isTeamStats={isTeamStats}>
        <RiSpeedMiniFill
          size={isTeamStats ? 14 : 10.6}
          className="stat__icon"
          fill="#f7ac0a"
        />
      </Stat>
    </div>
    <div className="col px-2">
      <Stat
        name="Durabilidad"
        value={powerstats.durability}
        isTeamStats={isTeamStats}
      >
        <AiFillHeart
          size={isTeamStats ? 14 : 10.6}
          className="stat__icon"
          fill="#3ac279"
        />
      </Stat>
    </div>
    <div className="col px-2">
      <Stat name="Poder" value={powerstats.power} isTeamStats={isTeamStats}>
        <BsLightningFill
          size={isTeamStats ? 14 : 10.6}
          className="stat__icon"
          fill="#735797"
        />
      </Stat>
    </div>
    <div className="col px-2">
      <Stat name="Combate" value={powerstats.combat} isTeamStats={isTeamStats}>
        <GiKnifeThrust
          size={isTeamStats ? 14 : 10.6}
          className="stat__icon"
          fill="#EE8130"
        />
      </Stat>
    </div>
  </div>
);

Powerstats.propTypes = {
  powerstats: PropTypes.shape({
    intelligence: PropTypes.number,
    strength: PropTypes.number,
    speed: PropTypes.number,
    durability: PropTypes.number,
    power: PropTypes.number,
    combat: PropTypes.number,
  }),
  isTeamStats: PropTypes.bool,
};

Powerstats.defaultProps = {
  isTeamStats: false,
};

export default Powerstats;
