import { graphql, Link } from "gatsby";
import React, { useReducer, useRef } from "react";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Fieldset from "../components/Fieldset";
import FilterPageHeader from "../components/FilterPageHeader";
import Label from "../components/Label";
import Layout from "../components/Layout";
import {
  PaginationInfo,
  PaginationWithButtons,
} from "../components/Pagination";
import ProgressGraph from "../components/ProgressGraph";
import RangeInput from "../components/RangeInput";
import SelectInput from "../components/SelectInput";
import Seo from "../components/Seo";
import ToggleButton from "../components/ToggleButton";
import { ReviewedMovie } from "../types";
import applyFilters from "../utils/apply-filters";
import slicePage from "../utils/slice-page";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../utils/sort-utils";
import styles from "./viewings.module.scss";

type Viewing = {
  imdbId: string;
  sequence: number;
  sortTitle: string;
  viewingDateSort: string;
  viewingDate: string;
  releaseDate: string;
  title: string;
  venue: string;
  year: string;
  reviewedMovie: ReviewedMovie;
};

/**
 * Renders the venue select options.
 */
function VenueOptions({
  viewings,
}: {
  /** The viewings to parse for possible venues. */
  viewings: Viewing[];
}): JSX.Element {
  const venues = Array.from(
    new Set(viewings.map((viewing) => viewing.venue))
  ).sort((a, b) => collator.compare(a, b));

  return (
    <>
      <option key="all" value="All">
        All
      </option>
      {venues.map((venue) => (
        <option key={venue} value={venue}>
          {venue}
        </option>
      ))}
    </>
  );
}

/**
 * Renders a viewing title.
 */
function ViewingTitle({
  viewing,
}: {
  /** The viewing to render */
  viewing: Viewing;
}): JSX.Element {
  let title = (
    <>
      {viewing.title}{" "}
      <span className={styles.list_item_title_year}>{viewing.year}</span>
    </>
  );

  if (viewing.reviewedMovie) {
    title = (
      <Link
        rel="canonical"
        to={`/reviews/${viewing.reviewedMovie.slug}/`}
        className={styles.list_item_title_link}
      >
        {title}
      </Link>
    );
  }

  return <div className={styles.list_item_title}>{title}</div>;
}

/**
 * Renders a viewing slug.
 */
function ViewingSlug({ viewing }: { viewing: Viewing }) {
  return (
    <div className={styles.list_item_slug}>
      {viewing.viewingDate} via {viewing.venue}
    </div>
  );
}

/**
 * Sorts a given collection of viewings using the given sort function key.
 * @param viewings The collection to sort.
 * @param sortOrder The sort function key.
 */
function sortViewings(viewings: Viewing[], sortOrder: string) {
  const sortMap: Record<string, (a: Viewing, b: Viewing) => number> = {
    "viewing-date-desc": (a, b) => sortNumberDesc(a.sequence, b.sequence),
    "viewing-date-asc": (a, b) => sortNumberAsc(a.sequence, b.sequence),
    "release-date-desc": (a, b) =>
      sortStringDesc(a.releaseDate.toString(), b.releaseDate.toString()),
    "release-date-asc": (a, b) =>
      sortStringAsc(a.releaseDate.toString(), b.releaseDate.toString()),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
  };

  const comparer = sortMap[sortOrder];
  return viewings.sort(comparer);
}

/**
 * Parses the given viewings and returns the [min, max] release years.
 * @param viewings The viewings to parse.
 */
function minMaxReleaseYearsForViewings(viewings: Viewing[]) {
  const releaseYears = viewings
    .map((viewing) => {
      return viewing.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

/** The page state. */
type State = {
  /** All possible viewings. */
  allViewings: Viewing[];
  /** Viewings matching the current filters. */
  filteredViewings: Viewing[];
  /** Viewings matching the current filters for the current page. */
  viewingsForPage: Viewing[];
  /** The active filters. */
  filters: Record<string, (viewing: Viewing) => boolean>;
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
function initState({ viewings }: { viewings: Viewing[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForViewings(viewings);
  const currentPage = 1;
  const perPage = 50;

  return {
    allViewings: viewings,
    filteredViewings: viewings,
    viewingsForPage: slicePage<Viewing>({
      collection: viewings,
      pageToSlice: currentPage,
      perPage,
    }),
    filters: {},
    currentPage,
    perPage,
    minYear,
    maxYear,
    sortValue: "viewing-date-desc",
    hideReviewed: false,
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_VENUE = "FILTER_VENUE";
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

/** Action to filter by title. */
interface FilterVenueAction {
  type: typeof FILTER_VENUE;
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
  | FilterReleaseYearAction
  | FilterVenueAction
  | SortAction
  | ChangePageAction
  | ToggleReviewedAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
function reducer(state: State, action: ActionTypes) {
  let filters;
  let filteredViewings;

  switch (action.type) {
    case FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (viewing: Viewing) => {
          return regex.test(viewing.title);
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        currentPage: 1,
        viewingsForPage: slicePage<Viewing>({
          collection: filteredViewings,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_VENUE: {
      filters = {
        ...state.filters,
        venue: (viewing: Viewing) => {
          if (action.value === "All") {
            return true;
          }

          return viewing.venue === action.value;
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        currentPage: 1,
        viewingsForPage: slicePage<Viewing>({
          collection: filteredViewings,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForViewings(
        state.allViewings
      );
      filters = {
        ...state.filters,
        releaseYear: (viewing: Viewing) => {
          const releaseYear = parseInt(viewing.year, 10);
          if (action.values === [minYear, maxYear]) {
            return true;
          }
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        currentPage: 1,
        viewingsForPage: slicePage<Viewing>({
          collection: filteredViewings,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case SORT: {
      filteredViewings = sortViewings(state.filteredViewings, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredViewings,
        viewingsForPage: slicePage<Viewing>({
          collection: filteredViewings,
          pageToSlice: state.currentPage,
          perPage: state.perPage,
        }),
      };
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        viewingsForPage: slicePage<Viewing>({
          collection: state.filteredViewings,
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
          reviewed: (viewing: Viewing) => {
            return !viewing.reviewedMovie;
          },
        };
      }
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        hideReviewed: !state.hideReviewed,
        currentPage: 1,
        viewingsForPage: slicePage<Viewing>({
          collection: filteredViewings,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    default:
      throw new Error();
  }
}

function ReviewedProgress({
  total,
  reviewed,
}: {
  total: number;
  reviewed: number;
}): JSX.Element {
  return (
    <>
      <ProgressGraph total={total} complete={reviewed} />
      <div className={styles.percent_totals}>
        {reviewed}/{total} Reviewed
      </div>
    </>
  );
}

function reviewedMovieCount(filteredViewings: Viewing[]): number {
  return filteredViewings.filter((viewing) => viewing.reviewedMovie).length;
}

/**
 * Renders the viewings page.
 */
export default function ViewingsPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      viewings: [...data.viewing.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  const reviewedCount = reviewedMovieCount(state.filteredViewings);

  return (
    <Layout>
      <Seo
        pageTitle="Viewing Log"
        description="A sortable and filterable list of every movie I've watched since 2012."
        image={null}
        article={false}
      />
      <main className={styles.container}>
        <div className={styles.left}>
          <FilterPageHeader
            className={styles.page_header}
            heading="Viewing Log"
            tagline={
              <>
                I&apos;ve watched {state.allViewings.length} movies since 2012.{" "}
                <span className={styles.quote}>
                  &ldquo;We have such sights to show you!&rdquo;
                </span>
                <br />
                <Link to="/viewings/stats/" className={styles.stats_link}>
                  Stats{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={styles.stats_icon}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </Link>
              </>
            }
          />
          <Fieldset className={styles.filters}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="viewings-title-input">
              Title
              <DebouncedInput
                id="viewings-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
              />
            </Label>
            <Label htmlFor="viewings-release-year-input">
              Release Year
              <RangeInput
                id="viewings-release-year-input"
                min={state.minYear}
                max={state.maxYear}
                onChange={(values) =>
                  dispatch({ type: FILTER_RELEASE_YEAR, values })
                }
              />
            </Label>
            <Label htmlFor="viewings-venue-input">
              Venue
              <SelectInput
                id="viewings-venue-input"
                onChange={(e) =>
                  dispatch({
                    type: FILTER_VENUE,
                    value: e.target.value,
                  })
                }
              >
                <VenueOptions viewings={state.allViewings} />
              </SelectInput>
            </Label>
            <Label htmlFor="viewings-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="viewings-sort-input"
                onChange={(e) =>
                  dispatch({ type: SORT, value: e.target.value })
                }
              >
                <option value="viewing-date-desc">
                  Viewing Date (Newest First)
                </option>
                <option value="viewing-date-asc">
                  Viewing Date (Oldest First)
                </option>
                <option value="release-date-desc">
                  Release Date (Newest First)
                </option>
                <option value="release-date-asc">
                  Release Date (Oldest First)
                </option>
                <option value="title">Title</option>
              </SelectInput>
            </Label>
          </Fieldset>
          <PaginationInfo
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredViewings.length}
            className={styles.pagination_info}
          />
          <div className={styles.percent}>
            <ReviewedProgress
              total={state.filteredViewings.length}
              reviewed={reviewedCount}
            />
            {(reviewedCount > 0 || state.hideReviewed) && (
              <ToggleButton
                id="to_watch-toggle_reviewed"
                onClick={() => dispatch({ type: TOGGLE_REVIEWED })}
              >
                {state.hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
              </ToggleButton>
            )}
          </div>
        </div>
        <div className={styles.right} ref={listHeader}>
          <ol className={styles.list}>
            {state.viewingsForPage.map((viewing, index) => {
              return (
                <li
                  value={viewing.sequence}
                  className={`${styles.list_item} ${
                    index === 0 ? styles.list_item_first : ""
                  }`}
                >
                  <ViewingTitle viewing={viewing} />
                  <ViewingSlug viewing={viewing} />
                </li>
              );
            })}
          </ol>
          <PaginationWithButtons
            className={styles.pagination}
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredViewings.length}
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
  viewing: {
    nodes: Viewing[];
  };
}

export const pageQuery = graphql`
  query {
    viewing: allViewingsJson(sort: { fields: [sequence], order: DESC }) {
      nodes {
        sequence
        viewingDate: viewing_date(formatString: "dddd MMM D, YYYY")
        releaseDate: release_date
        imdbId: imdb_id
        title
        venue
        year
        sortTitle: sort_title
        reviewedMovie {
          slug
        }
      }
    }
  }
`;
