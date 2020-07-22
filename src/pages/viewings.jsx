import { graphql } from "gatsby";
import React, { useReducer } from "react";
import PropTypes from "prop-types";

import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Layout from "../components/Layout";
import Pagination, { PaginationHeader } from "../components/Pagination";
import RangeInput from "../components/RangeInput";
import ReviewLink from "../components/ReviewLink";
import styles from "./viewings.module.scss";

function VenueOptions({ viewings }) {
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

VenueOptions.propTypes = {
  viewings: PropTypes.arrayOf(
    PropTypes.shape({
      venue: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function ViewingTitle({ viewing }) {
  return (
    <div className={styles.list_item_title}>
      <ReviewLink
        imdbId={viewing.imdb_id}
        className={styles.list_item_title_link}
      >
        <>
          {viewing.title}{" "}
          <span className={styles.list_item_title_year}>{viewing.year}</span>
        </>
      </ReviewLink>
    </div>
  );
}

ViewingTitle.propTypes = {
  viewing: PropTypes.shape({
    imdb_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

function ViewingSlug({ viewing }) {
  return (
    <div className={styles.list_item_slug}>
      {viewing.date} via {viewing.venue}.
    </div>
  );
}

ViewingSlug.propTypes = {
  viewing: PropTypes.shape({
    date: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
  }).isRequired,
};

function sortViewingDateAsc(a, b) {
  return sortStringAsc(a.sortDate, b.sortDate);
}

function sortViewingDateDesc(a, b) {
  return sortStringDesc(a.sortDate, b.sortDate);
}

function sortReleaseDateAsc(a, b) {
  return sortStringAsc(a.year, b.year);
}

function sortReleaseDateDesc(a, b) {
  return sortStringDesc(a.year, b.year);
}

function sortTitleAsc(a, b) {
  return collator.compare(a.sort_title, b.sort_title);
}

function escapeRegExp(str = "") {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}

function slicePage(viewings, currentPage, perPage) {
  const skip = perPage * (currentPage - 1);
  return viewings.slice(skip, currentPage * perPage);
}

function filterViewings(viewings, filters) {
  return viewings.filter((viewing) => {
    return Object.values(filters).every((filter) => {
      return filter(viewing);
    });
  });
}

function sortViewings(viewings, sortOrder) {
  const sortMap = {
    "viewing-date-desc": sortViewingDateDesc,
    "viewing-date-asc": sortViewingDateAsc,
    "release-date-desc": sortReleaseDateDesc,
    "release-date-asc": sortReleaseDateAsc,
    title: sortTitleAsc,
  };

  const comparer = sortMap[sortOrder];
  return viewings.sort(comparer);
}

function minMaxReleaseYearsForViewings(viewings) {
  const releaseYears = viewings
    .map((viewing) => {
      return viewing.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

function initState({ viewings }) {
  const [minYear, maxYear] = minMaxReleaseYearsForViewings(viewings);
  const currentPage = 1;
  const perPage = 50;

  return {
    allViewings: viewings,
    filteredViewings: viewings,
    viewingsForPage: slicePage(viewings, currentPage, perPage),
    filters: {},
    currentPage,
    perPage,
    minYear,
    maxYear,
  };
}

const actions = {
  FILTER_TITLE: "FILTER_TITLE",
  FILTER_VENUE: "FILTER_VENUE",
  FILTER_RELEASE_YEAR: "FILTER_RELEASE_YEAR",
  SORT: "SORT",
  CHANGE_PAGE: "CHANGE_PAGE",
};

function reducer(state, action) {
  let filters;
  let filteredViewings;

  switch (action.type) {
    case actions.FILTER_TITLE: {
      const regex = new RegExp(escapeRegExp(action.value), "i");
      filters = {
        ...state.filters,
        title: (viewing) => {
          return regex.test(viewing.title);
        },
      };
      filteredViewings = sortViewings(
        filterViewings(state.allViewings, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        currentPage: 1,
        viewingsForPage: slicePage(filteredViewings, 1, state.perPage),
      };
    }
    case actions.FILTER_VENUE: {
      filters = {
        ...state.filters,
        venue: (viewing) => {
          if (action.value === "All") {
            return true;
          }

          return viewing.venue === action.value;
        },
      };
      filteredViewings = sortViewings(
        filterViewings(state.allViewings, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        currentPage: 1,
        viewingsForPage: slicePage(filteredViewings, 1, state.perPage),
      };
    }
    case actions.FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForViewings(
        state.allViewings
      );
      filters = {
        ...state.filters,
        releaseYear: (viewing) => {
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
        filterViewings(state.allViewings, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
        currentPage: 1,
        viewingsForPage: slicePage(filteredViewings, 1, state.perPage),
      };
    }
    case actions.SORT: {
      filteredViewings = sortViewings(state.filteredViewings, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredViewings,
        viewingsForPage: slicePage(
          filteredViewings,
          state.currentPage,
          state.perPage
        ),
      };
    }
    case actions.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        viewingsForPage: slicePage(
          state.filteredViewings,
          action.value,
          state.perPage
        ),
      };
    }
    default:
      throw new Error();
  }
}

export default function ViewingsPage({ data }) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      viewings: [...data.allViewingsJson.nodes],
    },
    initState
  );

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.left}>
          <header className={styles.page_header}>
            <h2 className={styles.page_heading}>Viewing Log</h2>
            <p className={styles.page_tagline}>
              I&apos;ve watched {state.allViewings.length} movies since 2012.
            </p>
          </header>

          <div className={styles.filters}>
            <fieldset className={styles.filters_fieldset}>
              <legend>Filter &amp; Sort</legend>
              <label className={styles.label} htmlFor="viewings-title-input">
                Title
                <DebouncedInput
                  id="viewings-title-input"
                  className={styles.filter_text_input}
                  placeholder="Enter all or part of a title"
                  onChange={(value) =>
                    dispatch({ type: actions.FILTER_TITLE, value })
                  }
                />
              </label>
              <label
                className={styles.label}
                htmlFor="viewings-release-year-input"
              >
                Release Year
                <RangeInput
                  id="viewings-release-year-input"
                  min={state.minYear}
                  max={state.maxYear}
                  onChange={(values) =>
                    dispatch({ type: actions.FILTER_RELEASE_YEAR, values })
                  }
                />
              </label>
              <label className={styles.label} htmlFor="viewings-venue-input">
                Venue
                <select
                  id="viewings-venue-input"
                  className={styles.filter_select_input}
                  onChange={(e) =>
                    dispatch({
                      type: actions.FILTER_VENUE,
                      value: e.target.value,
                    })
                  }
                >
                  <VenueOptions viewings={state.allViewings} />
                </select>
              </label>
              <label className={styles.label} htmlFor="viewings-sort-input">
                Order By
                <select
                  value={state.sortValue}
                  className={styles.filter_select_input}
                  id="viewings-sort-input"
                  onChange={(e) =>
                    dispatch({ type: actions.SORT, value: e.target.value })
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
                </select>
              </label>
            </fieldset>
          </div>
        </div>
        <div className={styles.right}>
          <PaginationHeader
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredViewings.length}
          />
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
          <Pagination
            currentPage={state.currentPage}
            limit={state.perPage}
            numberOfItems={state.filteredViewings.length}
            onClick={(newPage) =>
              dispatch({ type: actions.CHANGE_PAGE, value: newPage })
            }
          />
        </div>
      </main>
    </Layout>
  );
}

ViewingsPage.propTypes = {
  data: PropTypes.shape({
    allViewingsJson: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query {
    allViewingsJson(sort: { fields: [sequence], order: DESC }) {
      nodes {
        sequence
        sortDate: date(formatString: "YYYY-MM-DD")
        date(formatString: "dddd MMM D, YYYY")
        imdb_id
        title
        venue
        year
        sort_title
      }
    }
  }
`;
