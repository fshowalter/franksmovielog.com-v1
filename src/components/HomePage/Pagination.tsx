import { Link } from "gatsby";
import ScreenReaderOnly from "../ScreenReaderOnly";
import {
  containerCss,
  currentPageCss,
  elipsisCss,
  paginationLinkCss,
} from "./Pagination.module.scss";

export default function Pagination({
  currentPage,
  perPage,
  numberOfItems,
  urlRoot,
  prevText,
  nextText,
}: {
  currentPage: number;
  perPage: number;
  numberOfItems: number;
  urlRoot: string;
  prevText: string;
  nextText: string;
}): JSX.Element {
  const numPages = Math.ceil(numberOfItems / perPage);

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
    <section className={`${containerCss}`}>
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
