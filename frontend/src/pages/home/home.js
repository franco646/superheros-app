import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { fetchTeams } from "../../redux/teams/teams.actions";

import { getTeamsByScore } from "../../redux/teams/teams.selector";

import Team from "../../components/team/team";
import Spinner from "../../components/spinner/spinner";
import Toolbar from "../../components/toolbar/toolbar";
import Alert from "../../components/alert/alert";

const Home = ({ teams, isFetching, fetchTeams, error }) => {
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div>
      {error ? <Alert>{error}</Alert> : null}
      <Toolbar />
      <div className="container">
        {isFetching ? (
          <Spinner />
        ) : (
          teams.map((team, i) => <Team team={team} key={i} />)
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  fetchTeams: PropTypes.func,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  teams: getTeamsByScore(state),
  isFetching: state.teams.isFetching,
  error: state.error.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeams: () => dispatch(fetchTeams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
