import React from "react";

import PropTypes from "prop-types";

const Button = ({ className, children, ...otherProps }) => (
  <button className={`btn ${className}`} {...otherProps}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
