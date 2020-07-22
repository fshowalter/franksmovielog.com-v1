import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import styles from "./pagination.module.scss";

export const PaginationHeader = React.forwardRef(
  ({ className, currentPage, perPage, numberOfItems }, ref) => {
    const start = currentPage * perPage - perPage || 1;
    const max = currentPage * perPage;
    const end = max < numberOfItems ? max : numberOfItems;

    return (
      <p ref={ref} className={className}>
        Showing {start}-{end} of {numberOfItems}.
      </p>
    );
  }
);

PaginationHeader.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  numberOfItems: PropTypes.number.isRequired,
};

PaginationHeader.defaultProps = {
  className: styles.header,
};

export default function Footer({
  currentPage,
  urlRoot,
  onClick,
  limit,
  numberOfItems,
}) {
  const useButton = !!onClick;

  const numPages = Math.ceil(numberOfItems / limit);

  if (numPages === 1) {
    return null;
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPageUrl =
    currentPage === 2 ? `${urlRoot}` : `${urlRoot}page-${currentPage - 1}/`;

  const nextPageUrl = `${urlRoot}page-${currentPage + 1}/`;

  let prev;

  if (isFirst) {
    prev = useButton ? (
      <button type="button" disabled className={styles.button}>
        ←Prev
      </button>
    ) : (
      <span className={styles.placeholder}>←Prev</span>
    );
  } else {
    prev = useButton ? (
      <button
        type="button"
        onClick={() => onClick(currentPage - 1)}
        className={styles.button}
      >
        ←Prev
      </button>
    ) : (
      <Link className={styles.link} to={prevPageUrl}>
        ←Prev
      </Link>
    );
  }

  let next;

  if (isLast) {
    next = useButton ? (
      <button type="button" disabled className={styles.button}>
        Next→
      </button>
    ) : (
      <span className={styles.placeholder}>Next→</span>
    );
  } else {
    next = useButton ? (
      <button
        type="button"
        onClick={() => onClick(currentPage + 1)}
        className={styles.button}
      >
        Next→
      </button>
    ) : (
      <Link className={styles.link} to={nextPageUrl}>
        Next→
      </Link>
    );
  }

  let firstPage = "";

  if (currentPage - 1 > 1) {
    firstPage = useButton ? (
      <button
        type="button"
        onClick={() => onClick(1)}
        className={styles.button}
      >
        1
      </button>
    ) : (
      <Link className={styles.link} to={`${urlRoot}`}>
        1
      </Link>
    );
  }

  let prevDots = "";

  if (currentPage - 2 > 1) {
    prevDots = <span className={styles.elipsis}>…</span>;
  }

  let prevPage = "";

  if (!isFirst) {
    prevPage = useButton ? (
      <button
        type="button"
        onClick={() => onClick(currentPage - 1)}
        className={styles.button}
      >
        {currentPage - 1}
      </button>
    ) : (
      <Link className={styles.link} to={prevPageUrl}>
        {currentPage - 1}
      </Link>
    );
  }

  let nextPage = "";

  if (isLast) {
    nextPage = <span className="pagination-placeholder" />;
  } else {
    nextPage = useButton ? (
      <button
        type="button"
        onClick={() => onClick(currentPage + 1)}
        className={styles.button}
      >
        {currentPage + 1}
      </button>
    ) : (
      <Link class={styles.link} to={nextPageUrl}>
        {currentPage + 1}
      </Link>
    );
  }

  let nextDots = "";

  if (currentPage + 2 < numPages) {
    nextDots = <span className={styles.elipsis}>…</span>;
  }

  let lastPage = "";

  if (currentPage + 1 < numPages) {
    lastPage = useButton ? (
      <button
        type="button"
        onClick={() => onClick(numPages)}
        className={styles.button}
      >
        {numPages}
      </button>
    ) : (
      <Link className={styles.link} to={`${urlRoot}page-${numPages}/`}>
        {numPages}
      </Link>
    );
  }

  return (
    <section className={styles.container}>
      <h3 className={styles.pagination_heading}>Pagination</h3>
      {prev} {firstPage} {prevDots} {prevPage}
      <span className={styles.current_page} aria-current="page">
        {currentPage}
      </span>
      {nextPage} {nextDots} {lastPage} {next}
    </section>
  );
}

Footer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  numberOfItems: PropTypes.number.isRequired,
  onClick: (props, propName) => {
    const { [propName]: onClick, urlRoot } = props;
    if (!urlRoot && (!onClick || typeof onClick !== "function")) {
      return new Error("Please provide a onClick function or urlRoot.");
    }

    return null;
  },
  urlRoot: PropTypes.string,
};

Footer.defaultProps = {
  onClick: null,
  urlRoot: null,
};
