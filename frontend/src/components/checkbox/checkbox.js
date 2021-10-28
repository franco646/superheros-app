import React from "react";

import PropTypes from "prop-types";

const Checkbox = ({ label, id, ...otherProps }) => (
  <div className="form-check mb-3">
    <input
      className="form-check-input"
      type="checkbox"
      id={id}
      {...otherProps}
    />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

export default Checkbox;
