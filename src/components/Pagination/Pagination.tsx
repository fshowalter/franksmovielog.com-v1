import { Link } from "gatsby";
import React from "react";
import * as styles from "./pagination.module.scss";

type PaginationProps = {
  /** The current page number, starting from 1. */
  currentPage: number;
  /** The nubmer of items per page, starting from 1. */
  perPage: number;
  /** The total number of items in the paginated collection, starting from 1. */
  numberOfItems: number;
};

export function PaginationInfo({
  currentPage,
  perPage,
  numberOfItems,
  className = styles.header,
}: PaginationProps & {
  /** CSS class to apply to the rendered element. */
  className?: string;
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

export function PaginationWithButtons({
  currentPage,
  perPage,
  numberOfItems,
  onClick,
}: PaginationProps & {
  /** Handler called when a pagination button is clicked. */
  onClick: (value: number) => void;
}): JSX.Element {
  const numPages = Math.ceil(numberOfItems / perPage);

  if (numPages === 1) {
    return (
      <PaginationInfo
        currentPage={1}
        numberOfItems={numberOfItems}
        perPage={perPage}
      />
    );
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  let prev;

  if (isFirst) {
    prev = (
      <button type="button" disabled className={styles.button}>
        ←Prev
      </button>
    );
  } else {
    prev = (
      <button
        type="button"
        onClick={() => onClick(currentPage - 1)}
        className={styles.button}
      >
        ←Prev
      </button>
    );
  }

  let next;

  if (isLast) {
    next = (
      <button type="button" disabled className={styles.button}>
        Next→
      </button>
    );
  } else {
    next = (
      <button
        type="button"
        onClick={() => onClick(currentPage + 1)}
        className={styles.button}
      >
        Next→
      </button>
    );
  }

  let firstPage: string | JSX.Element = "";

  if (currentPage - 1 > 1) {
    firstPage = (
      <button
        type="button"
        onClick={() => onClick(1)}
        className={styles.button}
      >
        1
      </button>
    );
  }

  let prevDots: string | JSX.Element = "";

  if (currentPage - 2 > 1) {
    prevDots = <span className={styles.elipsis}>…</span>;
  }

  let prevPage: string | JSX.Element = "";

  if (!isFirst) {
    prevPage = (
      <button
        type="button"
        onClick={() => onClick(currentPage - 1)}
        className={styles.button}
      >
        {currentPage - 1}
      </button>
    );
  }

  let nextPage: string | JSX.Element = "";

  if (isLast) {
    nextPage = <span className="pagination-placeholder" />;
  } else {
    nextPage = (
      <button
        type="button"
        onClick={() => onClick(currentPage + 1)}
        className={styles.button}
      >
        {currentPage + 1}
      </button>
    );
  }

  let nextDots: string | JSX.Element = "";

  if (currentPage + 2 < numPages) {
    nextDots = <span className={styles.elipsis}>…</span>;
  }

  let lastPage: string | JSX.Element = "";

  if (currentPage + 1 < numPages) {
    lastPage = (
      <button
        type="button"
        onClick={() => onClick(numPages)}
        className={styles.button}
      >
        {numPages}
      </button>
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

export function PaginationWithLinks({
  currentPage,
  perPage,
  numberOfItems,
  urlRoot,
}: PaginationProps & {
  /** The url root to use in generated page links including trailing slash. */
  urlRoot: string;
}): JSX.Element {
  const numPages = Math.ceil(numberOfItems / perPage);

  if (numPages === 1) {
    return (
      <PaginationInfo
        currentPage={1}
        numberOfItems={numberOfItems}
        perPage={perPage}
      />
    );
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPageUrl =
    currentPage === 2 ? `${urlRoot}` : `${urlRoot}page-${currentPage - 1}/`;

  const nextPageUrl = `${urlRoot}page-${currentPage + 1}/`;

  const prev = isFirst ? (
    <span>←Prev</span>
  ) : (
    <Link to={prevPageUrl}>←Prev</Link>
  );

  const next = isLast ? (
    <span>Next→</span>
  ) : (
    <Link to={nextPageUrl}>Next→</Link>
  );

  const firstPage = currentPage - 1 > 1 ? <Link to={`${urlRoot}`}>1</Link> : "";

  const prevDots =
    currentPage - 2 > 1 ? <span className={styles.elipsis}>…</span> : "";

  const prevPage = isFirst ? (
    ""
  ) : (
    <Link to={prevPageUrl}>{currentPage - 1}</Link>
  );

  const nextPage = isLast ? (
    <span className="pagination-placeholder" />
  ) : (
    <Link to={nextPageUrl}>{currentPage + 1}</Link>
  );

  const nextDots =
    currentPage + 2 < numPages ? <span className={styles.elipsis}>…</span> : "";

  const lastPage =
    currentPage + 1 < numPages ? (
      <Link to={`${urlRoot}page-${numPages}/`}>{numPages}</Link>
    ) : (
      ""
    );

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
