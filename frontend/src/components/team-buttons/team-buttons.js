import React from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import "./team-buttons.scss";

const TeamButtons = ({ teamId, onClickDelete, ...otherProps }) => (
  <span {...otherProps}>
    <Link to={`/edit/${teamId}`}>
      <MdModeEdit size="1.2em" className="ms-1 team-name__button" />
    </Link>
    <MdDeleteForever
      size="1.2em"
      data-testid="delete-team-button"
      className="ms-1 text-danger team-name__button"
      onClick={onClickDelete}
    />
  </span>
);

TeamButtons.propTypes = {
  teamId: PropTypes.number,
  onClickDelete: PropTypes.func,
};

TeamButtons.defaultProps = {
  onClickDelete: () => {},
};

export default TeamButtons;
