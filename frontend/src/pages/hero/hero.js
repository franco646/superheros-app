import React, { useEffect } from "react";

import { fetchHero, clearHero } from "../../redux/hero/hero.actions";

import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";
import Card from "../../components/card/card";
import Powerstats from "../../components/powerstats/powerstats";
import HeroDetailsList from "../../components/hero-details-list/hero-details-list";

import "./hero.scss";

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
      <div className="row row-cols-1 row-cols-md-2 align-items-center align-middle">
        <div className="col">
          <img src={hero.image.url} className="img-fluid p-3" alt={hero.name} />
        </div>
        <div className="col p-3">
          <h1 className="text-center mb-3">{hero.name}</h1>
          <Card>
            <Powerstats
              powerstats={hero.powerstats}
              className="row row-cols-3"
              isTeamStats={true}
            />
          </Card>
          <Card>
            <HeroDetailsList
              appearance={hero.appearance}
              aliases={hero.biography.aliases}
              workBase={hero.work.base}
            />
          </Card>
        </div>
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
