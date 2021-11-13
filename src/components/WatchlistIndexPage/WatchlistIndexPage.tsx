import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer, useRef } from "react";
import { collator } from "../../utils/sort-utils";
import toSentenceArray from "../../utils/to-sentence-array";
import Button from "../Button";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Layout from "../Layout";
import ProgressGraph from "../ProgressGraph";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
import YearInput from "../YearInput";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listHeaderGroupCss,
  listInfoCss,
  listItemCheckmarkCss,
  listItemCss,
  listItemPosterCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleLinkCss,
  listItemTitleYearCss,
  nestedListCss,
  pageHeaderCss,
  percentCss,
  percentTotalsCss,
  quoteCss,
  rightCss,
  showMoreCss,
  typeIconCss,
  typeLinkCss,
  typeLinksCss,
} from "./WatchlistIndexPage.module.scss";
import type { SortType } from "./WatchlistIndexPage.reducer";
import reducer, { ActionType, initState } from "./WatchlistIndexPage.reducer";

function ListInfo({
  visible,
  total,
}: {
  visible: number;
  total: number;
}): JSX.Element {
  let showingText;

  if (visible > total) {
    showingText = `Showing ${total} of ${total}`;
  } else {
    showingText = `Showing 1-${visible} of ${total.toLocaleString()}`;
  }

  return <div className={listInfoCss}>{showingText}</div>;
}

function groupForMovie(movie: WatchlistMovie, sortValue: SortType): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return movie.releaseDate.substring(0, 4);
    }
    case "title": {
      const letter = movie.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return movie.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupMovies({
  movies,
  sortValue,
}: {
  movies: WatchlistMovie[];
  sortValue: SortType;
}): Map<string, WatchlistMovie[]> {
  const groupedMovies: Map<string, WatchlistMovie[]> = new Map();

  movies.map((movie) => {
    const group = groupForMovie(movie, sortValue);
    let groupValue = groupedMovies.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedMovies.set(group, groupValue);
    }
    groupValue.push(movie);
  });

  return groupedMovies;
}

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
          strokeWidth={0.5}
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
        {reviewed}/{total.toLocaleString()} Reviewed
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

function WatchlistMoviePoster({
  movie,
}: {
  movie: WatchlistMovie;
}): JSX.Element {
  const poster = (
    <GatsbyImage
      className={listItemPosterCss}
      image={movie.poster.childImageSharp.gatsbyImageData}
      alt={`A poster from ${movie.title} (${movie.year})`}
    />
  );

  if (movie.reviewedMovieSlug) {
    return (
      <Link
        rel="canonical"
        to={`/reviews/${movie.reviewedMovieSlug}/`}
        className={listItemPosterCss}
      >
        {poster}
      </Link>
    );
  }

  return <div className={listItemPosterCss}>{poster}</div>;
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
  const groupedMovies = groupMovies({
    movies: state.filteredMovies.slice(0, state.showCount),
    sortValue: state.sortValue,
  });

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
                <q className={quoteCss}>
                  A man&apos;s got to know his limitations.
                </q>
                <p>
                  My movie review bucketlist.{" "}
                  {state.allMovies.length.toLocaleString()} titles. No silents
                  or documentaries.{" "}
                </p>
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
          <div className={filtersCss}>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Title"
                placeholder="Enter all or part of a title"
                onChange={(value) =>
                  dispatch({ type: ActionType.FILTER_TITLE, value })
                }
              />
              <SelectInput
                label="Director"
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
              <SelectInput
                label="Performer"
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
              <SelectInput
                label="Writer"
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
              <SelectInput
                label="Collection"
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
              <YearInput
                label="Release Year"
                years={data.watchlist.releaseYears}
                onChange={(values) =>
                  dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
                }
              />
              <SelectInput
                label="Order By"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.SORT,
                    value: e.target.value as SortType,
                  })
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
            </Fieldset>
            <div className={listInfoCss}>
              <ListInfo
                visible={state.showCount}
                total={state.filteredMovies.length}
              />
            </div>
            <div className={percentCss}>
              <WatchlistProgress
                total={state.filteredMovies.length}
                reviewed={reviewedCount}
              />
              {(reviewedCount > 0 || state.hideReviewed) && (
                <Button
                  onClick={() => dispatch({ type: ActionType.TOGGLE_REVIEWED })}
                >
                  {state.hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div ref={listHeader} className={rightCss}>
          <ol data-testid="movies-list" className={listCss}>
            {[...groupedMovies].map(([group, movies], index) => {
              return (
                <li key={group}>
                  <div
                    className={listHeaderGroupCss}
                    style={{ zIndex: index + 100 }}
                  >
                    {group}
                  </div>
                  <ol className={nestedListCss}>
                    {movies.map((movie) => {
                      return (
                        <li key={movie.imdbId} className={listItemCss}>
                          <WatchlistMoviePoster movie={movie} />
                          <WatchlistMovieTitle movie={movie} />
                          <WatchlistMovieSlug movie={movie} />
                          <WatchlistMovieCheckMark movie={movie} />
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>
          <div className={showMoreCss}>
            {state.filteredMovies.length > state.showCount && (
              <Button onClick={() => dispatch({ type: ActionType.SHOW_MORE })}>
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
                Show More
              </Button>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export interface WatchlistMovie {
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
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageQueryResult {
  watchlist: {
    nodes: WatchlistMovie[];
    releaseYears: string[];
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
        poster {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              formats: [JPG, AVIF]
              quality: 80
              width: 50
              placeholder: TRACED_SVG
            )
          }
        }
      }
      releaseYears: distinct(field: year)
    }
  }
`;
