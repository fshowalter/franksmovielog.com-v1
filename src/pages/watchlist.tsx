import { graphql } from "gatsby";
import React, { useReducer, useRef } from "react";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Fieldset from "../components/Fieldset";
import Label from "../components/Label";
import Layout from "../components/Layout";
import {
  PaginationInfo,
  PaginationWithButtons,
} from "../components/Pagination";
import RangeInput from "../components/RangeInput";
import ReviewLink from "../components/ReviewLink";
import SelectInput from "../components/SelectInput";
import MarkdownReview from "../types/MarkdownReview";
import WatchlistMovie, {
  WatchlistCollection,
  WatchlistPerson,
} from "../types/WatchlistMovie";
import applyFilters from "../utils/apply-filters";
import slicePage from "../utils/slice-page";
import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import toSentenceArray from "../utils/to-sentence-array";
import styles from "./watchlist.module.scss";

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
  keyName: "collections" | "directors" | "performers" | "writers";
}) {
  const names = [
    ...new Set(
      movies.flatMap((movie) => {
        return movie[keyName].map((keyValue) => keyValue.name);
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
  return (
    <div className={styles.list_item_title}>
      <ReviewLink imdbId={movie.imdbId} className={styles.list_item_title_link}>
        <>
          {movie.title}{" "}
          <span className={styles.list_item_title_year}>{movie.year}</span>
        </>
      </ReviewLink>
    </div>
  );
}

/**
 * Formats a given collection of watchlist person names to a sentence with
 * commas and conjunction if necessary.
 * @param people The people to format.
 * @param suffix The suffix to append to the formed sentence.
 */
function formatPeople(
  people: WatchlistPerson[],
  suffix: string | string[]
): string[] {
  if (people.length === 0) {
    return [""];
  }

  const names = people.map((person) => person.name);

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
function formatCollections(
  collections: WatchlistCollection[]
): string | string[] {
  if (collections.length === 0) {
    return "";
  }
  const names = collections.map((collection) => collection.name);

  const suffix = names.length > 1 ? "collections" : "collection";

  return [`it's in the ${toSentenceArray(names).join("")} ${suffix}`];
}

/**
 * Renders a watchlist title slug.
 */
function WatchlistMovieSlug({ movie }: { movie: WatchlistMovie }): JSX.Element {
  const credits = [
    ...formatPeople(movie.directors, "directed"),
    ...formatPeople(movie.performers, "performed"),
    ...formatPeople(movie.writers, [
      "has a writing credit",
      "have writing credits",
    ]),
    ...formatCollections(movie.collections),
  ];

  return (
    <div className={styles.list_item_slug}>
      Because {toSentenceArray(credits)}.
    </div>
  );
}

/**
 * Sorts a given collection of watchlist movies using the given sort function key.
 * @param titles The collection to sort.
 * @param sortOrder The sort function key.
 */
function sortMovies(titles: WatchlistMovie[], sortOrder: string) {
  const sortMap: Record<
    string,
    (a: WatchlistMovie, b: WatchlistMovie) => number
  > = {
    "release-date-asc": (a, b) => sortStringAsc(a.year, b.year),
    "release-date-desc": (a, b) => sortStringDesc(a.year, b.year),
    title: (a, b) => collator.compare(a.title, b.title),
  };

  const comparer = sortMap[sortOrder];
  return titles.sort(comparer);
}

/**
 * Parses the given watchlist movies and returns the [min, max] release years.
 * @param titles The watchlist movies to parse.
 */
function minMaxReleaseYearsForMovies(movies: WatchlistMovie[]) {
  const releaseYears = movies
    .map((movie) => {
      return movie.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

type State = {
  /** All possible reviews. */
  allReviews: MarkdownReview[];
  /** All possible watchlist movies. */
  allMovies: WatchlistMovie[];
  /** Watchlist movies matching the current filters. */
  filteredMovies: WatchlistMovie[];
  /** Watchlist movies matching the current filters for the current page. */
  moviesForPage: WatchlistMovie[];
  /** The active filters. */
  filters: Record<string, (movie: WatchlistMovie) => boolean>;
  /** The current page. */
  currentPage: number;
  /** The number of reviews per page. */
  perPage: number;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue: string;
  /** True if reviewed items are currently hidden. */
  hideReviewed: boolean;
};

/**
 * Initializes the page state.
 */
function initState({
  movies,
  reviews,
}: {
  movies: WatchlistMovie[];
  reviews: MarkdownReview[];
}): State {
  const [minYear, maxYear] = minMaxReleaseYearsForMovies(movies);
  const currentPage = 1;
  const perPage = 50;

  return {
    allReviews: reviews,
    allMovies: movies,
    filteredMovies: movies,
    moviesForPage: slicePage<WatchlistMovie>({
      collection: movies,
      pageToSlice: currentPage,
      perPage,
    }),
    filters: {},
    sortValue: "release-date-asc",
    hideReviewed: false,
    currentPage,
    perPage,
    minYear,
    maxYear,
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_DIRECTOR = "FILTER_DIRECTOR";
const FILTER_PERFORMER = "FILTER_PERFORMER";
const FILTER_WRITER = "FILTER_WRITER";
const FILTER_COLLECTION = "FILTER_COLLECTION";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";
const CHANGE_PAGE = "CHANGE_PAGE";
const TOGGLE_REVIEWED = "TOGGLE_REVIEWED";

/** Action to filter by title. */
interface FilterTitleAction {
  type: typeof FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by collection. */
interface FilterCollectionAction {
  type: typeof FILTER_COLLECTION;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by director. */
interface FilterDirectorAction {
  type: typeof FILTER_DIRECTOR;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by performer. */
interface FilterPerformerAction {
  type: typeof FILTER_PERFORMER;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by writer. */
interface FilterWriterAction {
  type: typeof FILTER_WRITER;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by release year. */
interface FilterReleaseYearAction {
  type: typeof FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

/** Action to sort. */
interface SortAction {
  type: typeof SORT;
  /** The sorter to apply. */
  value: string;
}

/** Action to change page. */
interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  /** The page to change to. */
  value: number;
}

/** Action to change page. */
interface ToggleReviewedAction {
  type: typeof TOGGLE_REVIEWED;
}

type ActionTypes =
  | FilterTitleAction
  | FilterCollectionAction
  | FilterReleaseYearAction
  | FilterDirectorAction
  | FilterPerformerAction
  | FilterWriterAction
  | SortAction
  | ToggleReviewedAction
  | ChangePageAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
function reducer(state: State, action: ActionTypes): State {
  let filters;
  let filteredMovies;

  switch (action.type) {
    case FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (movie: WatchlistMovie) => {
          return regex.test(movie.title);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_DIRECTOR: {
      filters = {
        ...state.filters,
        director: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          if (movie.directors.length === 0) {
            return false;
          }

          return movie.directors.some(
            (director) => director.name === action.value
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_PERFORMER: {
      filters = {
        ...state.filters,
        performer: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          if (movie.performers.length === 0) {
            return false;
          }

          return movie.performers.some(
            (performer) => performer.name === action.value
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_WRITER: {
      filters = {
        ...state.filters,
        writer: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          if (movie.writers.length === 0) {
            return false;
          }

          return movie.writers.some((writer) => writer.name === action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_COLLECTION: {
      filters = {
        ...state.filters,
        collection: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          if (movie.collections.length === 0) {
            return false;
          }

          return movie.collections.some(
            (collection) => collection.name === action.value
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForMovies(state.allMovies);
      filters = {
        ...state.filters,
        releaseYear: (movie: WatchlistMovie) => {
          const releaseYear = parseInt(movie.year, 10);
          if (action.values === [minYear, maxYear]) {
            return true;
          }
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case SORT: {
      filteredMovies = sortMovies(state.filteredMovies, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredMovies,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: state.currentPage,
          perPage: state.perPage,
        }),
      };
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: state.filteredMovies,
          pageToSlice: action.value,
          perPage: state.perPage,
        }),
      };
    }
    case TOGGLE_REVIEWED: {
      if (state.hideReviewed) {
        filters = {
          ...state.filters,
        };
        delete filters.reviewed;
      } else {
        filters = {
          ...state.filters,
          reviewed: (movie: WatchlistMovie) => {
            return !state.allReviews.some(
              (review) => review.frontmatter.imdbId === movie.imdbId
            );
          },
        };
      }
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        hideReviewed: !state.hideReviewed,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    default:
      throw new Error();
  }
}

/**
 * Renders the watchlist page.
 */
export default function WatchlistPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      reviews: [...data.review.nodes],
      movies: [...data.watchlist.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.left}>
          <header className={styles.page_header}>
            <h2 className={styles.page_heading}>Watchlist</h2>
            <p className={styles.page_tagline}>
              My movie review bucketlist.{" "}
              {state.allMovies.length.toLocaleString()} titles. No silents or
              documentaries.
            </p>
          </header>
          <Fieldset className={styles.filters}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="to_watch-title-input">
              Title
              <DebouncedInput
                id="to_watch-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
              />
            </Label>
            <Label htmlFor="to_watch-director-input">
              Director
              <SelectInput
                id="to_watch-director-input"
                onChange={(e) =>
                  dispatch({
                    type: FILTER_DIRECTOR,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="directors"
                />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-performer-input">
              Performer
              <SelectInput
                id="to_watch-performer-input"
                onChange={(e) =>
                  dispatch({
                    type: FILTER_PERFORMER,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="performers"
                />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-writer-input">
              Writer
              <SelectInput
                id="to_watch-writer-input"
                onChange={(e) =>
                  dispatch({
                    type: FILTER_WRITER,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions movies={state.allMovies} keyName="writers" />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-collection-input">
              Collection
              <SelectInput
                id="to_watch-collection-input"
                onChange={(e) =>
                  dispatch({
                    type: FILTER_COLLECTION,
                    value: e.target.value,
                  })
                }
              >
                <WatchlistOptions
                  movies={state.allMovies}
                  keyName="collections"
                />
              </SelectInput>
            </Label>
            <Label htmlFor="to_watch-release-year-input">
              Release Year
              <RangeInput
                id="to_watch-release-year-input"
                min={state.minYear}
                max={state.maxYear}
                onChange={(values) =>
                  dispatch({ type: FILTER_RELEASE_YEAR, values })
                }
              />
            </Label>
            <Label htmlFor="to_watch-sort-input">
              Order By
              <SelectInput
                id="to_watch-sort-input"
                onChange={(e) =>
                  dispatch({ type: SORT, value: e.target.value })
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
            <button
              id="to_watch-toggle_reviewed"
              type="button"
              className={styles.toggle_review_button}
              onClick={() => dispatch({ type: TOGGLE_REVIEWED })}
            >
              {state.hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
            </button>
          </Fieldset>
          <PaginationInfo
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredMovies.length}
            className={styles.pagination_info}
          />
        </div>
        <div ref={listHeader} className={styles.right}>
          <ol className={styles.list}>
            {state.moviesForPage.map((movie, index) => {
              return (
                <li
                  className={`${styles.list_item} ${
                    index === 0 ? styles.list_item_first : ""
                  }`}
                >
                  <WatchlistMovieTitle movie={movie} />
                  <WatchlistMovieSlug movie={movie} />
                </li>
              );
            })}
          </ol>
          <PaginationWithButtons
            className={styles.pagination}
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredMovies.length}
            onClick={(newPage) => {
              dispatch({ type: CHANGE_PAGE, value: newPage });
              if (listHeader && listHeader.current) {
                listHeader.current.scrollIntoView();
              }
            }}
          />
        </div>
      </main>
    </Layout>
  );
}

interface PageQueryResult {
  review: {
    nodes: MarkdownReview[];
  };
  watchlist: {
    nodes: WatchlistMovie[];
  };
}

export const pageQuery = graphql`
  query {
    review: allMarkdownRemark(filter: { postType: { eq: "REVIEW" } }) {
      nodes {
        frontmatter {
          imdbId: imdb_id
          slug
        }
      }
    }
    watchlist: allWatchlistTitlesJson(sort: { fields: [year], order: ASC }) {
      nodes {
        imdbId: imdb_id
        title
        year
        directors {
          name
        }
        performers {
          name
        }
        writers {
          name
        }
        collections {
          name
        }
      }
    }
  }
`;
