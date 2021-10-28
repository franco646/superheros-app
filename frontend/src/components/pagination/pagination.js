import React, { useState } from "react";

import PropTypes from "prop-types";

import "./pagination.scss";

const Pagination = ({ pages, ariaLabel, onPageChange, ...otherProps }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleNextPageChange = () => {
    const page = currentPage + 1;
    if (page <= pages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handlePreviousPageChange = () => {
    const page = currentPage - 1;
    if (page > 0) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const pageItems = [];
  for (let i = 1; i <= pages; i++) {
    pageItems.push(
      <li
        className={`page-item ${currentPage === i ? "active" : ""}`}
        key={i}
        data-testid="page"
      >
        <div className="page-link" onClick={() => handlePageChange(i)}>
          {i}
        </div>
      </li>
    );
  }

  return (
    <nav aria-label={ariaLabel} data-testid="pagination">
      <ul
        className="pagination justify-content-center flex-wrap m-3"
        {...otherProps}
      >
        <li className="page-item">
          <div
            className="page-link"
            onClick={handlePreviousPageChange}
            data-testid="previous-page-button"
          >
            Anterior
          </div>
        </li>
        {pageItems}
        <li className="page-item">
          <div
            className="page-link"
            onClick={handleNextPageChange}
            data-testid="next-page-button"
          >
            Siguiente
          </div>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number,
  ariaLabel: PropTypes.string,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: () => {},
};

export default Pagination;
