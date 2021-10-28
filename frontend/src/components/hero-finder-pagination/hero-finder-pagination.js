import React from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { FETCHED_HEROES_LIMIT } from "../../constants";

import Pagination from "../pagination/pagination";

const HeroFinderPagination = ({ countOfHeroes, onPageChange }) => {
  const pages = Math.ceil(countOfHeroes / FETCHED_HEROES_LIMIT);
  return countOfHeroes / FETCHED_HEROES_LIMIT > 1 ? (
    <Pagination pages={pages} onPageChange={onPageChange} />
  ) : null;
};

HeroFinderPagination.propTypes = {
  countOfHeroes: PropTypes.number,
  onPageChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  countOfHeroes: state.heroes.count,
});

export default connect(mapStateToProps)(HeroFinderPagination);
