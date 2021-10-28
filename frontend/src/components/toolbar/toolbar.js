import React from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { setTeamScoreFilter } from "../../redux/filter/filter.actions";

import { Link } from "react-router-dom";
import Button from "../button/button";

import { TEAMS_FILTERS } from "../../constants";

const Toolbar = ({ setTeamScoreFilter }) => {
  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setTeamScoreFilter(filter);
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 px-3 mt-3">
      <div className="col col-sm-4 col-md-3 col-lg-2 mb-3">
        <Link to="/edit">
          <Button className="btn-primary btn-lg w-100 mx-auto">
            Crear equipo
          </Button>
        </Link>
      </div>
      <div className="col mb-0 col-sm-8 col-md-9 col-lg-10">
        <select
          className="form-select form-select-lg mb-3 w-auto ms-sm-auto m-auto m-sm-0 pe-5"
          aria-label="teams__filter-selector"
          onChange={handleFilterChange}
          data-testid="score-team-select"
        >
          {Object.keys(TEAMS_FILTERS).map((filterKey) => (
            <option key={filterKey} value={TEAMS_FILTERS[filterKey]}>
              {TEAMS_FILTERS[filterKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  setTeamScoreFilter: PropTypes.func,
};

export default connect(null, { setTeamScoreFilter })(Toolbar);
