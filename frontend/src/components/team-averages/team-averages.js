import React from "react";

import PropTypes from "prop-types";

import Powerstats from "../powerstats/powerstats";

import "./team-averages.scss";

const TeamAverages = ({ averages }) => (
  <div className="row row-cols-2 row-cols-xl-1 my-3 my-xl-0 team__averages">
    <div className="col col-4 my-1">
      <div className="row row-cols-1 row-cols-xl-3 fs-6 text-center text-nowrap fw-bold">
        <div className="col">Pts: {averages.total}</div>
        <div className="col">{averages.height}m</div>
        <div className="col">{averages.weight}kg</div>
      </div>
    </div>
    <div className="col col-8">
      <Powerstats
        powerstats={averages}
        className="row row-cols-3"
        isTeamStats={true}
      />
    </div>
  </div>
);

TeamAverages.propTypes = {
  averages: PropTypes.shape({
    total: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number,
  }),
};

export default TeamAverages;
