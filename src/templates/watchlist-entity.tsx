import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React, { useReducer } from "react";
import DebouncedInput from "../components/DebouncedInput";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import {
  PaginationInfo,
  PaginationWithButtons,
} from "../components/Pagination";
import RangeInput from "../components/RangeInput";
import ReviewLink from "../components/ReviewLink";
import JsonReview from "../types/JsonReview";
import MarkdownReview from "../types/MarkdownReview";
import applyFilters from "../utils/apply-filters";
import slicePage from "../utils/slice-page";
import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import styles from "./watchlist-entity.module.scss";

function sortReviews(reviews: JsonReview[], sortOrder: string) {
  const sortMap: Record<string, (a: JsonReview, b: JsonReview) => number> = {
    title: (a, b) => collator.compare(a.title, b.title),
    "release-date-desc": (a, b) => sortStringDesc(a.year, b.year),
    "release-date-asc": (a, b) => sortStringAsc(a.year, b.year),
    "grade-asc": (a, b) =>
      sortStringAsc(a.gradeValue.toString(), b.gradeValue.toString()),
    "grade-desc": (a, b) =>
      sortStringDesc(a.gradeValue.toString(), b.gradeValue.toString()),
  };

  const comparer = sortMap[sortOrder];

  if (!comparer) {
    return reviews;
  }

  return reviews.sort(comparer);
}

/**
 * Returns the min and max release years for a given collection of reviews.
 * @param reviews The reviews collection.
 */
function minMaxReleaseYearsForReviews(reviews: JsonReview[]) {
  const releaseYears = reviews
    .map((review) => {
      return review.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

/**
 * The page state.
 */
type State = {
  /** All possible reviews. */
  allReviews: JsonReview[];
  /** Reviews matching the current filters. */
  filteredReviews: JsonReview[];
  /** Reviews matching the current filters for the current page. */
  reviewsForPage: JsonReview[];
  /** The active filters. */
  filters: Record<string, (review: JsonReview) => boolean>;
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
};

function initState({ reviews }: { reviews: JsonReview[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForReviews(reviews);
  const currentPage = 1;
  const perPage = 100;

  return {
    allReviews: reviews,
    filteredReviews: reviews,
    reviewsForPage: slicePage<JsonReview>({
      collection: reviews,
      pageToSlice: currentPage,
      perPage,
    }),
    filters: {},
    currentPage,
    perPage,
    minYear,
    maxYear,
    sortValue: "title",
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";
const CHANGE_PAGE = "CHANGE_PAGE";

/** Action to filter by title. */
interface FilterTitleAction {
  type: typeof FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by title. */
interface FilterReleaseYearAction {
  type: typeof FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

interface SortAction {
  type: typeof SORT;
  /** The sorter to apply. */
  value: string;
}

interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  /** The page to change to. */
  value: number;
}

type ActionTypes =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ChangePageAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
function reducer(state: State, action: ActionTypes): State {
  let filters;
  let filteredReviews;

  switch (action.type) {
    case FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (review: JsonReview) => {
          return regex.test(review.title);
        },
      };
      filteredReviews = sortReviews(
        applyFilters<JsonReview>({ collection: state.allReviews, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage<JsonReview>({
          collection: filteredReviews,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForReviews(state.allReviews);
      filters = {
        ...state.filters,
        releaseYear: (review: JsonReview) => {
          const releaseYear = parseInt(review.year, 10);
          if (action.values === [minYear, maxYear]) {
            return true;
          }
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredReviews = sortReviews(
        applyFilters<JsonReview>({ collection: state.allReviews, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage<JsonReview>({
          collection: filteredReviews,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case SORT: {
      filteredReviews = sortReviews(state.filteredReviews, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredReviews,
        reviewsForPage: slicePage<JsonReview>({
          collection: filteredReviews,
          pageToSlice: state.currentPage,
          perPage: state.perPage,
        }),
      };
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        reviewsForPage: slicePage<JsonReview>({
          collection: state.filteredReviews,
          pageToSlice: action.value,
          perPage: state.perPage,
        }),
      };
    }
    default:
      throw new Error(`Unknown action type.`);
  }
}

/**
 * Renders the header lead in for the current entity type.
 */
function EntityHeader({ pageContext }: { pageContext: PageContext }) {
  switch (pageContext.entityType) {
    case "COLLECTION":
      return <>{`Collection of ${pageContext.imdbIds.length} movies.`}</>;
    case "DIRECTOR":
      return <>{`Director of ${pageContext.imdbIds.length} movies.`}</>;
    case "PERFORMER":
      return <>{`Performer in ${pageContext.imdbIds.length} movies.`}</>;
    case "WRITER":
      return <>{`Writing credits on ${pageContext.imdbIds.length} movies.`}</>;
    default:
      throw new Error(
        `Unknown entityType parameter: ${pageContext.entityType}`
      );
  }
}

/**
 * Renders a watchlist page for a given person.
 */
export default function WatchlistPersonPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      reviews: [...data.review.nodes],
    },
    initState
  );

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.left}>
          <header className={styles.page_header}>
            <h2 className={styles.page_heading}>{pageContext.name}</h2>
            <p className={styles.page_tagline}>
              <EntityHeader pageContext={pageContext} /> I&apos;ve reviewed{" "}
              {data.review.nodes.length}.
            </p>
          </header>
          <div className={styles.filters}>
            <fieldset className={styles.filters_fieldset}>
              <legend>Filter &amp; Sort</legend>
              <label className={styles.label} htmlFor="viewings-title-input">
                Title
                <DebouncedInput
                  id={styles.filter_text_input}
                  placeholder="Enter all or part of a title"
                  className={styles.filter_text_input}
                  onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
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
                    dispatch({ type: FILTER_RELEASE_YEAR, values })
                  }
                />
              </label>
              <label className={styles.label} htmlFor="viewings-sort-input">
                Order By
                <select
                  value={state.sortValue}
                  id="viewings-sort-input"
                  className={styles.filter_select_input}
                  onChange={(e) =>
                    dispatch({ type: SORT, value: e.target.value })
                  }
                >
                  <option value="title">Title</option>
                  <option value="grade-desc">Grade (Best First)</option>
                  <option value="grade-asc">Grade (Worst First)</option>
                  <option value="release-date-desc">
                    Release Date (Newest First)
                  </option>
                  <option value="release-date-asc">
                    Release Date (Oldest First)
                  </option>
                </select>
              </label>
            </fieldset>
          </div>
        </div>
        <div className={styles.right}>
          <PaginationInfo
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredReviews.length}
          />
          <ul className={styles.list}>
            {data.review.nodes.map((review) => {
              const markdownNode = data.backdrop.nodes.find(
                (item) => item.frontmatter.sequence === review.sequence
              );

              if (!markdownNode) {
                throw new Error(
                  `No review markdown found for ${review.title} (IMDb ID: ${review.imdbId})`
                );
              }

              return (
                <li className={styles.list_item}>
                  <article>
                    <div className={styles.list_item_content}>
                      <Link
                        className={styles.list_item_image_link}
                        to={`/reviews/${review.slug}/`}
                      >
                        <Img
                          fluid={markdownNode.backdrop.childImageSharp.fluid}
                          alt={`A still from ${review.title} (${review.year})`}
                        />
                      </Link>
                      <h2 className={styles.list_item_heading}>
                        <ReviewLink imdbId={review.imdbId}>
                          {review.title}{" "}
                          <span
                            className={styles.list_item_heading_review_year}
                          >
                            {review.year}
                          </span>
                        </ReviewLink>
                      </h2>
                      <Grade
                        gradeValue={review.gradeValue}
                        className={styles.review_grade}
                      />
                    </div>
                  </article>
                </li>
              );
            })}
            <PaginationWithButtons
              currentPage={state.currentPage}
              perPage={state.perPage}
              numberOfItems={state.filteredReviews.length}
              onClick={(newPage) =>
                dispatch({ type: CHANGE_PAGE, value: newPage })
              }
            />
          </ul>
        </div>
      </main>
    </Layout>
  );
}

interface PageContext {
  name: string;
  imdbIds: string[];
  entityType: string;
}

interface PageQueryResult {
  backdrop: {
    nodes: MarkdownReview[];
  };
  review: {
    nodes: JsonReview[];
  };
}

export const pageQuery = graphql`
  query($imdbIds: [String]) {
    backdrop: allMarkdownRemark(
      filter: {
        postType: { eq: "REVIEW" }
        frontmatter: { imdb_id: { in: $imdbIds } }
      }
    ) {
      nodes {
        frontmatter {
          sequence
        }
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, jpegQuality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }

    review: allReviewsJson(
      sort: { fields: [year], order: ASC }
      filter: { imdb_id: { in: $imdbIds } }
    ) {
      nodes {
        imdbId: imdb_id
        title
        year
        sequence
        gradeValue: grade_value
      }
    }
  }
`;
