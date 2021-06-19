import { graphql, Link } from "gatsby";
import React, { useReducer, useRef } from "react";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Fieldset from "../components/Fieldset";
import FilterPageHeader from "../components/FilterPageHeader";
import Label from "../components/Label";
import Layout from "../components/Layout";
import RangeInput from "../components/RangeInput";
import SelectInput from "../components/SelectInput";
import Seo from "../components/Seo";
import StatsLink from "../components/StatsLink";
import applyFilters from "../utils/apply-filters";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../utils/sort-utils";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listItemCss,
  listItemFirstCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleLinkCss,
  listItemTitleYearCss,
  pageHeaderCss,
  quoteCss,
  rightCss,
} from "./viewings.module.scss";

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
      <span className={listItemTitleYearCss}>{viewing.year}</span>
    </>
  );

  if (viewing.slug) {
    title = (
      <Link
        rel="canonical"
        to={`/reviews/${viewing.slug}/#${viewing.sequence}`}
        className={listItemTitleLinkCss}
      >
        {title}
      </Link>
    );
  }

  return <div className={listItemTitleCss}>{title}</div>;
}

/**
 * Renders a viewing slug.
 */
function ViewingSlug({ viewing }: { viewing: Viewing }) {
  return (
    <div className={listItemSlugCss}>
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
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
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

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

  return [minYear, maxYear];
}

/** The page state. */
type State = {
  /** All possible viewings. */
  allViewings: Viewing[];
  /** Viewings matching the current filters. */
  filteredViewings: Viewing[];
  /** The active filters. */
  filters: Record<string, (viewing: Viewing) => boolean>;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue: string;
};

/**
 * Initializes the page state.
 */
function initState({ viewings }: { viewings: Viewing[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForViewings(viewings);

  return {
    allViewings: viewings,
    filteredViewings: viewings,
    filters: {},
    minYear,
    maxYear,
    sortValue: "viewing-date-desc",
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_VENUE = "FILTER_VENUE";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";

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

type ActionTypes =
  | FilterTitleAction
  | FilterReleaseYearAction
  | FilterVenueAction
  | SortAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
function reducer(state: State, action: ActionTypes): State {
  // eslint-disable-line consistent-return
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
      };
    }
    case FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (viewing: Viewing) => {
          const releaseYear = viewing.year;
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
      };
    }
    case SORT: {
      filteredViewings = sortViewings(state.filteredViewings, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredViewings,
      };
    }
    // no default
  }
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

  return (
    <Layout>
      <Seo
        pageTitle="Viewing Log"
        description="A sortable and filterable list of every movie I've watched since 2012."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Viewing Log"
            tagline={
              <>
                I&apos;ve watched {state.allViewings.length.toLocaleString()}{" "}
                movies since 2012.{" "}
                <span className={quoteCss}>
                  &ldquo;We have such sights to show you.&rdquo;
                </span>
                <br />
                <StatsLink to="/viewings/stats/" />
              </>
            }
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="viewings-title-input">
              Title
              <DebouncedInput
                id="viewings-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
              />
            </Label>
            <RangeInput
              id="viewings-release-year-input"
              label="Release Year"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: FILTER_RELEASE_YEAR, values })
              }
            />
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
        </div>
        <div className={rightCss} ref={listHeader}>
          <ol data-testid="viewings-list" className={listCss}>
            {state.filteredViewings.map((viewing, index) => {
              return (
                <li
                  value={viewing.sequence}
                  key={viewing.sequence}
                  className={`${listItemCss} ${
                    index === 0 ? listItemFirstCss : ""
                  }`}
                >
                  <ViewingTitle viewing={viewing} />
                  <ViewingSlug viewing={viewing} />
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </Layout>
  );
}

type Viewing = {
  title: string;
  year: number;
  releaseDate: string;
  viewingDate: string;
  sequence: number;
  venue: string;
  sortTitle: string;
  slug: string | null;
};

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
        title
        venue
        year
        sortTitle: sort_title
        slug
      }
    }
  }
`;
