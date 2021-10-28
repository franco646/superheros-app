import React from "react";

import PropTypes from "prop-types";

const Card = ({ children, isInvalid, ...otherProps }) => (
  <div
    className={`card overflow-visible bg-secondary mb-3 p-1 ${
      isInvalid ? "border-danger" : "border-gray-3"
    }`}
    {...otherProps}
  >
    <div className="card-body p-1">{children}</div>
  </div>
);

Card.propTypes = {
  isInvalid: PropTypes.bool,
};

Card.defaultProps = {
  isInvalid: false,
};

export default Card;
