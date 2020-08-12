import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import * as styles from "./pagination.module.scss";

export function PaginationHeader({
  className = styles.header,
  currentPage,
  perPage,
  numberOfItems,
}: {
  className?: string;
  currentPage: number;
  perPage: number;
  numberOfItems: number;
}): JSX.Element {
  const start = currentPage * perPage - perPage || 1;
  const max = currentPage * perPage;
  const end = max < numberOfItems ? max : numberOfItems;

  return (
    <p className={className}>
      Showing {start}-{end} of {numberOfItems}.
    </p>
  );
}

PaginationHeader.defaultProps = {
  className: styles.header,
};

export default function Footer({
  currentPage,
  urlRoot,
  onClick,
  limit,
  numberOfItems,
}: FooterProps): JSX.Element {
  const useButton = !!onClick;

  const numPages = Math.ceil(numberOfItems / limit);

  if (numPages === 1) {
    return (
      <PaginationHeader
        currentPage={1}
        numberOfItems={numberOfItems}
        perPage={limit}
      />
    );
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
      <span>←Prev</span>
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
      <Link to={prevPageUrl}>←Prev</Link>
    );
  }

  let next;

  if (isLast) {
    next = useButton ? (
      <button type="button" disabled className={styles.button}>
        Next→
      </button>
    ) : (
      <span>Next→</span>
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
      <Link to={nextPageUrl}>Next→</Link>
    );
  }

  let firstPage: string | JSX.Element = "";

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
      <Link to={`${urlRoot}`}>1</Link>
    );
  }

  let prevDots: string | JSX.Element = "";

  if (currentPage - 2 > 1) {
    prevDots = <span className={styles.elipsis}>…</span>;
  }

  let prevPage: string | JSX.Element = "";

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
      <Link to={prevPageUrl}>{currentPage - 1}</Link>
    );
  }

  let nextPage: string | JSX.Element = "";

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
      <Link to={nextPageUrl}>{currentPage + 1}</Link>
    );
  }

  let nextDots: string | JSX.Element = "";

  if (currentPage + 2 < numPages) {
    nextDots = <span className={styles.elipsis}>…</span>;
  }

  let lastPage: string | JSX.Element = "";

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
      <Link to={`${urlRoot}page-${numPages}/`}>{numPages}</Link>
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

type onClickType = (pageNumber: number) => void;

type FooterProps = {
  currentPage: number;
  limit: number;
  numberOfItems: number;
  onClick: onClickType;
  urlRoot: string;
  [key: string]: number | string | onClickType;
};

Footer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  numberOfItems: PropTypes.number.isRequired,
  onClick: (props: FooterProps, propName: string) => {
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
