import React, { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { debounce } from "lodash";

import { connect } from "react-redux";

import { fetchHeroesBySearchParam } from "../../redux/heroes/heroes.actions";

import NotHeroesFound from "../not-heroes-found/not-heroes-found";
import HeroFinderPagination from "../hero-finder-pagination/hero-finder-pagination";
import HeroFinderResults from "../hero-finder-results/hero-finder-results";
import FloatingInput from "../floating-input/floating-input";
import Spinner from "../spinner/spinner";

const HeroFinder = ({
  fetchByParam,
  fetchedHeroes,
  isFetchingHeroes,
  teamHeroes,
  onSelectHero,
}) => {
  const [searchParam, setSearchParam] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState([]);

  const delayedAPICall = useCallback(debounce(fetchByParam, 500), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilteredHeroes(filterHeroes(fetchedHeroes, teamHeroes));
  }, [fetchedHeroes, teamHeroes]);

  useEffect(() => {
    if (searchParam) {
      delayedAPICall(searchParam);
    }
  }, [searchParam, delayedAPICall]);

  const handleSearch = (e) => {
    setSearchParam(e.target.value);
  };

  const handlePageChange = (page) => {
    const offset = (page - 1) * 12;
    fetchByParam(searchParam, offset);
  };

  // filters the heroes that are already in the team.
  const filterHeroes = (arr1, arr2) => {
    let res = [];
    res = arr1.filter((el) => {
      return !arr2.find((element) => {
        return element.id === el.id;
      });
    });
    return res;
  };

  return (
    <>
      <FloatingInput
        label="Buscar héroes y villanos"
        id="heroes-search__input"
        data-testid="heroes-search__input"
        onChange={handleSearch}
      />
      {isFetchingHeroes ? (
        <Spinner />
      ) : filteredHeroes.length > 0 ? (
        <HeroFinderResults
          heroes={filteredHeroes}
          onSelectHero={onSelectHero}
        />
      ) : (
        <NotHeroesFound />
      )}
      <HeroFinderPagination onPageChange={handlePageChange} />
    </>
  );
};

HeroFinder.propTypes = {
  fetchByParam: PropTypes.func,
  fetchedHeroes: PropTypes.array,
  isFetchingHeroes: PropTypes.bool,
  teamHeroes: PropTypes.array,
  onSelectHero: PropTypes.func,
};

HeroFinder.defaultProps = {
  teamHeroes: [],
  fetchedHeroes: [],
};

const mapStateToProps = (state) => ({
  fetchedHeroes: state.heroes.heroes,
  isFetchingHeroes: state.heroes.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchByParam: (searchParam, offset) =>
    dispatch(fetchHeroesBySearchParam(searchParam, offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroFinder);
