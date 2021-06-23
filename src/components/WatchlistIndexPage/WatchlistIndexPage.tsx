import { graphql, Link } from "gatsby";
import React, { useReducer, useRef } from "react";
import { collator } from "../../utils/sort-utils";
import toSentenceArray from "../../utils/to-sentence-array";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Label from "../Label";
import Layout from "../Layout";
import { PaginationInfo, PaginationWithButtons } from "../Pagination";
import ProgressGraph from "../ProgressGraph";
import RangeInput from "../RangeInput";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
import ToggleButton from "../ToggleButton";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listItemCheckmarkCss,
  listItemCss,
  listItemFirstCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleLinkCss,
  listItemTitleYearCss,
  pageHeaderCss,
  paginationCss,
  paginationInfoCss,
  percentCss,
  percentTotalsCss,
  quoteCss,
  rightCss,
  typeIconCss,
  typeLinkCss,
  typeLinksCss,
} from "./WatchlistIndexPage.module.scss";
import reducer, { ActionType, initState } from "./WatchlistIndexPage.reducer";

/**
 * Renders options for a watchlist person or collection select.
 */
function WatchlistOptions({
  movies,
  keyName,
}: {
  /** The watchlist titles to parse for persons or collections. */
  movies: WatchlistMovie[];
  /** The key name to parse. */
  keyName:
    | "collectionNames"
    | "directorNames"
    | "performerNames"
    | "writerNames";
}) {
  const names = [
    ...new Set(
      movies.flatMap((movie) => {
        return movie[keyName];
      })
    ),
  ].sort((a, b) => collator.compare(a, b));

  return (
    <>
      <option key="all" value="All">
        All
      </option>
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </>
  );
}

/**
 * Renders a watchlist movie title.
 */
function WatchlistMovieTitle({
  movie,
}: {
  /** The movie to render */
  movie: WatchlistMovie;
}): JSX.Element {
  let title = (
    <>
      {movie.title} <span className={listItemTitleYearCss}>{movie.year}</span>
    </>
  );

  if (movie.reviewedMovieSlug) {
    title = (
      <Link
        rel="canonical"
        to={`/reviews/${movie.reviewedMovieSlug}/`}
        className={listItemTitleLinkCss}
      >
        {title}
      </Link>
    );
  }

  return <div className={listItemTitleCss}>{title}</div>;
}

function WatchlistMovieCheckMark({
  movie,
}: {
  movie: WatchlistMovie;
}): JSX.Element {
  if (movie.reviewedMovieSlug) {
    return (
      <svg
        className={listItemCheckmarkCss}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  return <div className={listItemCheckmarkCss} />;
}

/**
 * Formats a given collection of watchlist person names to a sentence with
 * commas and conjunction if necessary.
 * @param people The people to format.
 * @param suffix The suffix to append to the formed sentence.
 */
function formatPeopleNames(
  names: string[],
  suffix: string | string[]
): string[] {
  if (names.length === 0) {
    return [""];
  }

  let append;

  if (Array.isArray(suffix)) {
    append = names.length > 1 ? suffix[1] : suffix[0];
  } else {
    append = suffix;
  }

  return [`${toSentenceArray(names).join("")} ${append}`];
}

/**
 * Formats a given collection of watchlist collection names to a sentence with
 * commas and conjunction if necessary.
 * @param collections The collections to format.
 */
function formatCollectionNames(names: string[]): string | string[] {
  if (names.length === 0) {
    return "";
  }

  const suffix = names.length > 1 ? "collections" : "collection";

  return [`it's in the ${toSentenceArray(names).join("")} ${suffix}`];
}

/**
 * Renders a watchlist title slug.
 */
function WatchlistMovieSlug({ movie }: { movie: WatchlistMovie }): JSX.Element {
  const credits = [
    ...formatPeopleNames(movie.directorNames, "directed"),
    ...formatPeopleNames(movie.performerNames, "performed"),
    ...formatPeopleNames(movie.writerNames, [
      "has a writing credit",
      "have writing credits",
    ]),
    ...formatCollectionNames(movie.collectionNames),
  ];

  return (
    <div className={listItemSlugCss}>Because {toSentenceArray(credits)}.</div>
  );
}

function WatchlistProgress({
  total,
  reviewed,
}: {
  total: number;
  reviewed: number;
}): JSX.Element {
  return (
    <>
      <ProgressGraph total={total} complete={reviewed} />
      <div className={percentTotalsCss}>
        {reviewed}/{total} Reviewed
      </div>
    </>
  );
}

function reviewedMovieCount(filteredMovies: WatchlistMovie[]): number {
  const reviewedMovies = filteredMovies.filter((m) => m.reviewedMovieSlug);

  return reviewedMovies.length;
}

function WatchlistPeopleLinkItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <li>
      <Link to={to} className={typeLinkCss}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={typeIconCss}
        >
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        {children}
      </Link>
    </li>
  );
}

function WatchlistCollectionLinkItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <li>
      <Link to={to} className={typeLinkCss}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={typeIconCss}
        >
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
        {children}
      </Link>
    </li>
  );
}

/**
 * Renders the watchlist page.
 */
export default function WatchlistIndexPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...data.watchlist.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);
  const reviewedCount = reviewedMovieCount(state.filteredMovies);

  return (
    <Layout>
      <Seo
        pageTitle="Watchlist"
        description="My movie review bucketlist."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Watchlist"
            tagline={
              <>
                My movie review bucketlist.{" "}
                {state.allMovies.length.toLocaleString()} titles. No silents or
                documentaries.{" "}
                <span className={quoteCss}>
                  &ldquo;A man&apos;s got to know his limitations&rdquo;
                </span>
              </>
            }
          />
          <ul className={typeLinksCss}>
            <WatchlistPeopleLinkItem to="/watchlist/directors/">
              Directors
            </WatchlistPeopleLinkItem>

            <WatchlistPeopleLinkItem to="/watchlist/performers/">
              Performers
            </WatchlistPeopleLinkItem>
            <WatchlistPeopleLinkItem to="/watchlist/writers/">
              Writers
            </WatchlistPeopleLinkItem>
            <WatchlistCollectionLinkItem to="/watchlist/collections/">
              Collections
            </WatchlistCollectionLinkItem>
          </ul>
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="to_watch-title-input">
              Title
              <DebouncedInput
                id="to_watch-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) =>
                  dispatch({ type: ActionType.FILTER_TITLE, value })
                }
              />
            </Label>
            <Label htmlFor="to_watch-director-input">
              Director
              <SelectInput
                id="to_watch-director-input"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_DIRECTOR,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="directorNames"
                />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-performer-input">
              Performer
              <SelectInput
                id="to_watch-performer-input"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_PERFORMER,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="performerNames"
                />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-writer-input">
              Writer
              <SelectInput
                id="to_watch-writer-input"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_WRITER,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="writerNames"
                />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-collection-input">
              Collection
              <SelectInput
                id="to_watch-collection-input"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_COLLECTION,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="collectionNames"
                />
              </SelectInput>
            </Label>
            <RangeInput
              id="to_watch-release-year-input"
              label="Release Year"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
              }
            />
            <Label htmlFor="to_watch-sort-input">
              Order By
              <SelectInput
                id="to_watch-sort-input"
                onChange={(e) =>
                  dispatch({ type: ActionType.SORT, value: e.target.value })
                }
              >
                <option value="release-date-asc">
                  Release Date (Oldest First)
                </option>
                <option value="release-date-desc">
                  Release Date (Newest First)
                </option>
                <option value="title">Title</option>
              </SelectInput>
            </Label>
          </Fieldset>
          <PaginationInfo
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredMovies.length}
            className={paginationInfoCss}
          />
          <div className={percentCss}>
            <WatchlistProgress
              total={state.filteredMovies.length}
              reviewed={reviewedCount}
            />
            {(reviewedCount > 0 || state.hideReviewed) && (
              <ToggleButton
                id="to_watch-toggle_reviewed"
                onClick={() => dispatch({ type: ActionType.TOGGLE_REVIEWED })}
              >
                {state.hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
              </ToggleButton>
            )}
          </div>
        </div>
        <div ref={listHeader} className={rightCss}>
          <ol data-testid="watchlist-list" className={listCss}>
            {state.moviesForPage.map((movie, index) => {
              return (
                <li
                  key={movie.imdbId}
                  className={`${listItemCss} ${
                    index === 0 ? listItemFirstCss : ""
                  }`}
                >
                  <WatchlistMovieTitle movie={movie} />
                  <WatchlistMovieSlug movie={movie} />
                  <WatchlistMovieCheckMark movie={movie} />
                </li>
              );
            })}
          </ol>
          <PaginationWithButtons
            className={paginationCss}
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredMovies.length}
            onClick={(newPage) => {
              dispatch({ type: ActionType.CHANGE_PAGE, value: newPage });
              listHeader &&
                listHeader.current &&
                listHeader.current.scrollIntoView();
            }}
          />
        </div>
      </main>
    </Layout>
  );
}

type WatchlistMovie = {
  collectionNames: string[];
  directorNames: string[];
  imdbId: string;
  performerNames: string[];
  title: string;
  writerNames: string[];
  year: number;
  reviewedMovieSlug: string | null;
  sortTitle: string;
  releaseDate: string;
};

interface PageQueryResult {
  watchlist: {
    nodes: WatchlistMovie[];
  };
}

export const pageQuery = graphql`
  query {
    watchlist: allWatchlistMoviesJson(
      sort: { fields: [release_date], order: ASC }
    ) {
      nodes {
        imdbId: imdb_id
        title
        year
        releaseDate: release_date
        sortTitle: sort_title
        reviewedMovieSlug
        directorNames
        performerNames
        writerNames
        collectionNames: collection_names
      }
    }
  }
`;
