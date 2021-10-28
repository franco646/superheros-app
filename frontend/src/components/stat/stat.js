import React from "react";

import PropTypes from "prop-types";

import "./stat.scss";

const Stat = ({ value, name, children, isTeamStats }) => (
  <div className={`stat text-center ${isTeamStats ? "is-team-stats" : ""}`}>
    <div className="text-uppercase text-gray-1 text-nowrap">{name}</div>
    <div className="d-inline-flex">
      <div className="align-middle bg-gray-3 stat__icon-box">{children}</div>
      <div className="ms-1 stat__value">{value}</div>
    </div>
  </div>
);

Stat.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string,
  isTeamStats: PropTypes.bool,
};

Stat.defaultProps = {
  isTeamStats: false,
};

export default Stat;
