import React from "react";

const Spinner = ({ ...otherProps }) => (
  <div className="d-flex justify-content-center" data-testid="spinner">
    <div className="spinner-border" role="status" {...otherProps}>
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

export default Spinner;
