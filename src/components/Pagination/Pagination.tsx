import { Link } from "gatsby";
import React from "react";
import ScreenReaderOnly from "../ScreenReaderOnly";
import {
  buttonCss,
  containerCss,
  currentPageCss,
  elipsisCss,
  infoCss,
  paginationLinkCss,
} from "./Pagination.module.scss";

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
  className,
}: PaginationProps & {
  /** CSS class to apply to the rendered element. */
  className?: string;
}): JSX.Element {
  if (numberOfItems === 0) {
    return <p className={`${infoCss} ${className || ""}`}>No results.</p>;
  }

  const start = currentPage * perPage - perPage || 1;
  const max = currentPage * perPage;
  const end = max < numberOfItems ? max : numberOfItems;

  return (
    <p className={`${infoCss} ${className || ""}`}>
      Showing {start}-{end} of {numberOfItems}.
    </p>
  );
}

PaginationInfo.defaultProps = {
  className: "",
};

export function PaginationWithButtons({
  currentPage,
  perPage,
  numberOfItems,
  onClick,
  className,
}: PaginationProps & {
  /** Handler called when a pagination button is clicked. */
  onClick: (value: number) => void;
  className?: string;
}): JSX.Element | null {
  if (numberOfItems === 0) {
    return null;
  }

  const numPages = Math.ceil(numberOfItems / perPage);

  if (numPages === 1) {
    return (
      <PaginationInfo
        currentPage={1}
        numberOfItems={numberOfItems}
        perPage={perPage}
        className={className}
      />
    );
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  let prev;

  if (isFirst) {
    prev = null;
  } else {
    prev = (
      <button
        type="button"
        onClick={() => onClick(currentPage - 1)}
        className={buttonCss}
      >
        ←Prev
      </button>
    );
  }

  let next;

  if (isLast) {
    next = null;
  } else {
    next = (
      <button
        type="button"
        onClick={() => onClick(currentPage + 1)}
        className={buttonCss}
      >
        Next →
      </button>
    );
  }

  let firstPage: string | JSX.Element = "";

  if (currentPage - 1 > 1) {
    firstPage = (
      <button type="button" onClick={() => onClick(1)} className={buttonCss}>
        1
      </button>
    );
  }

  let prevDots: string | JSX.Element = "";

  if (currentPage - 2 > 1) {
    prevDots = <span className={elipsisCss}>…</span>;
  }

  let prevPage: string | JSX.Element = "";

  if (!isFirst) {
    prevPage = (
      <button
        type="button"
        onClick={() => onClick(currentPage - 1)}
        className={buttonCss}
      >
        {currentPage - 1}
      </button>
    );
  }

  let nextPage: string | JSX.Element = "";

  if (isLast) {
    nextPage = <span />;
  } else {
    nextPage = (
      <button
        type="button"
        onClick={() => onClick(currentPage + 1)}
        className={buttonCss}
      >
        {currentPage + 1}
      </button>
    );
  }

  let nextDots: string | JSX.Element = "";

  if (currentPage + 2 < numPages) {
    nextDots = <span className={elipsisCss}>…</span>;
  }

  let lastPage: string | JSX.Element = "";

  if (currentPage + 1 < numPages) {
    lastPage = (
      <button
        type="button"
        onClick={() => onClick(numPages)}
        className={buttonCss}
      >
        {numPages}
      </button>
    );
  }

  return (
    <section className={`${containerCss} ${className || ""}`}>
      <ScreenReaderOnly>
        <h3>Pagination</h3>
      </ScreenReaderOnly>
      {prev} {firstPage} {prevDots} {prevPage}
      <span className={currentPageCss} aria-current="page">
        {currentPage}
      </span>
      {nextPage} {nextDots} {lastPage} {next}
    </section>
  );
}

PaginationWithButtons.defaultProps = {
  className: "",
};

export function PaginationWithLinks({
  currentPage,
  perPage,
  numberOfItems,
  urlRoot,
  className,
  prevText = "Prev",
  nextText = "Next",
}: PaginationProps & {
  /** The url root to use in generated page links including trailing slash. */
  urlRoot: string;
  className?: string;
  /** Text to use for previous page link */
  prevText: string;
  /** Text to use for next page link */
  nextText: string;
}): JSX.Element {
  const numPages = Math.ceil(numberOfItems / perPage);

  if (numPages === 1) {
    return (
      <PaginationInfo
        currentPage={1}
        numberOfItems={numberOfItems}
        perPage={perPage}
        className={className}
      />
    );
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPageUrl =
    currentPage === 2 ? `${urlRoot}` : `${urlRoot}page-${currentPage - 1}/`;

  const nextPageUrl = `${urlRoot}page-${currentPage + 1}/`;

  const prev = isFirst ? null : (
    <Link to={prevPageUrl} className={paginationLinkCss}>
      {`← ${prevText}`}
    </Link>
  );

  const next = isLast ? null : (
    <Link to={nextPageUrl} className={paginationLinkCss}>
      {`${nextText} →`}
    </Link>
  );

  const firstPage =
    currentPage - 1 > 1 ? (
      <Link className={paginationLinkCss} to={urlRoot}>
        1
      </Link>
    ) : (
      ""
    );

  const prevDots =
    currentPage - 2 > 1 ? <span className={elipsisCss}>…</span> : "";

  const prevPage = isFirst ? (
    <span />
  ) : (
    <Link to={prevPageUrl} className={paginationLinkCss}>
      {currentPage - 1}
    </Link>
  );

  const nextPage = isLast ? (
    <span />
  ) : (
    <Link to={nextPageUrl} className={paginationLinkCss}>
      {currentPage + 1}
    </Link>
  );

  const nextDots =
    currentPage + 2 < numPages ? <span className={elipsisCss}>…</span> : "";

  const lastPage =
    currentPage + 1 < numPages ? (
      <Link to={`${urlRoot}page-${numPages}/`} className={paginationLinkCss}>
        {numPages}
      </Link>
    ) : (
      ""
    );

  return (
    <section className={`${containerCss} ${className || ""}`}>
      <ScreenReaderOnly>
        <h3>Pagination</h3>
      </ScreenReaderOnly>
      {prev} {firstPage} {prevDots} {prevPage}
      <span className={currentPageCss} aria-current="page">
        {currentPage}
      </span>
      {nextPage} {nextDots} {lastPage} {next}
    </section>
  );
}

PaginationWithLinks.defaultProps = {
  className: "",
};
