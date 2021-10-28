import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import HeroAverages from "../team-averages/team-averages";
import TeamButtons from "../team-buttons/team-buttons";
import Heroes from "../heroes/heroes";
import Card from "../card/card";

import { calculateAverages } from "../../utils/averages-calculator";

import { deleteTeam } from "../../redux/teams/teams.actions";

import "./team.scss";

const Team = ({
  team,
  editionMode,
  onRemoveHero,
  deleteTeam,
  isInvalid,
  ...otherProps
}) => {
  const [averages, setAverages] = useState({});

  useEffect(() => {
    if (editionMode) {
      return setAverages(calculateAverages(team));
    }
    setAverages(team.averages);
  }, [team, editionMode]);

  const handleDeleteTeam = () => {
    deleteTeam(team);
  };

  return (
    <Card isInvalid={isInvalid} {...otherProps} data-testid="team">
      <div className="row row-cols-1 row-cols-xl-2">
        <div className="col col-12 col-xl-3 position-relative">
          <h5
            className="card-title text-nowrap text-center"
            data-testid="team-name"
          >
            {team.name}
            {!editionMode ? (
              <TeamButtons teamId={team.id} onClickDelete={handleDeleteTeam} />
            ) : null}
          </h5>
          <HeroAverages averages={averages} />
        </div>
        <div className="col col-12 col-xl-9">
          <Heroes
            heroes={team.heroes}
            editionMode={editionMode}
            onRemoveHero={onRemoveHero}
          />
        </div>
      </div>
    </Card>
  );
};

Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    averages: PropTypes.object,
    heroes: PropTypes.array,
  }),
  onRemoveHero: PropTypes.func,
  deleteTeam: PropTypes.func,
  editionMode: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

Team.defaultProps = {
  onRemoveHero: () => {},
  deleteTeam: () => {},
  editionMode: false,
  isInvalid: false,
};

const mapDispatchToProps = (dispatch) => ({
  deleteTeam: (id) => dispatch(deleteTeam(id)),
});

export default connect(null, mapDispatchToProps)(Team);
