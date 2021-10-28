import React from "react";

import PropTypes from "prop-types";

const FloatingInput = ({ label, id, error, ...otherProps }) => (
  <div className="form-floating mb-3">
    <input
      className={`form-control ${error ? "is-invalid" : ""}`}
      id={id}
      placeholder={label}
      autoComplete="off"
      {...otherProps}
    />
    <label htmlFor={id}>{!error ? label : error}</label>
  </div>
);

FloatingInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
};

export default FloatingInput;
