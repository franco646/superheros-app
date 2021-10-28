import React, { useEffect } from "react";

import { fetchHero, clearHero } from "../../redux/hero/hero.actions";

import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";

const Hero = ({ hero, isFetching, fetchHero, clearHero, redirectTo }) => {
  let { heroId } = useParams();

  useEffect(() => {
    fetchHero(heroId);
    return () => clearHero();
  }, [fetchHero, heroId, clearHero]);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return isFetching ? (
    <Spinner />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col">
          <img src={hero ? hero.image.url : ""} alt={hero.name} />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hero: state.hero.hero,
  isFetching: state.hero.isFetching,
  redirectTo: state.redirect.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHero: (id) => dispatch(fetchHero(id)),
  clearHero: () => dispatch(clearHero()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
