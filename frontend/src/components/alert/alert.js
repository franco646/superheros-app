import React from "react";

const Alert = ({ children, ...otherProps }) => (
  <div
    className="alert alert-danger text-center fs-5"
    role="alert"
    data-testid="alert"
    {...otherProps}
  >
    {children}
  </div>
);

export default Alert;
