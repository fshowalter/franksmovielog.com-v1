import { graphql, Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React, { useReducer, useRef } from "react";
import DebouncedInput from "../components/DebouncedInput";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import {
  PaginationInfo,
  PaginationWithButtons,
} from "../components/Pagination";
import RangeInput from "../components/RangeInput";
import ReviewLink from "../components/ReviewLink";
import MarkdownReview from "../types/MarkdownReview";
import WatchlistMovie from "../types/WatchlistMovie";
import applyFilters from "../utils/apply-filters";
import slicePage from "../utils/slice-page";
import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import styles from "./watchlist-entity.module.scss";

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

  if (!comparer) {
    return titles;
  }

  return titles.sort(comparer);
}

/**
 * Returns the min and max release years for a given collection of movies.
 * @param movies The movies collection.
 */
function minMaxReleaseYears(movies: WatchlistMovie[]) {
  const releaseYears = movies
    .map((title) => {
      return title.year;
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
  allMovies: WatchlistMovie[];
  /** Reviews matching the current filters. */
  filteredMovies: WatchlistMovie[];
  /** Reviews matching the current filters for the current page. */
  moviesForPage: WatchlistMovie[];
  /** The active filters. */
  filters: Record<string, (title: WatchlistMovie) => boolean>;
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

function initState({ movies }: { movies: WatchlistMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYears(movies);
  const currentPage = 1;
  const perPage = 24;

  return {
    allMovies: movies,
    filteredMovies: movies,
    moviesForPage: slicePage<WatchlistMovie>({
      collection: movies,
      pageToSlice: currentPage,
      perPage,
    }),
    filters: {},
    currentPage,
    perPage,
    minYear,
    maxYear,
    sortValue: "release-date-asc",
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
  let filteredMovies;

  switch (action.type) {
    case FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (review: WatchlistMovie) => {
          return regex.test(review.title);
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
      const [minYear, maxYear] = minMaxReleaseYears(state.allMovies);
      filters = {
        ...state.filters,
        releaseYear: (review: WatchlistMovie) => {
          const releaseYear = parseInt(review.year, 10);
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

function ReviewedListItem({
  review,
  movie,
}: {
  review: MarkdownReview;
  movie: WatchlistMovie;
}): JSX.Element {
  return (
    <li className={styles.list_item}>
      <Link
        className={styles.list_item_image_link}
        to={`/reviews/${review.frontmatter.slug}/`}
      >
        <Img
          fluid={review.backdrop.childImageSharp.fluid}
          alt={`A still from ${movie.title} (${movie.year})`}
        />
      </Link>
      <div className={styles.list_item_title}>
        <ReviewLink imdbId={review.frontmatter.imdbId}>
          {movie.title}{" "}
          <span className={styles.list_item_title_year}>{movie.year}</span>
        </ReviewLink>
      </div>
      <Grade
        grade={review.frontmatter.grade}
        className={styles.list_item_grade}
      />
    </li>
  );
}

function UnreviewedListItem({
  movie,
  backdrop,
}: {
  movie: WatchlistMovie;
  backdrop: FluidObject;
}): JSX.Element {
  return (
    <li className={styles.list_item}>
      <Img fluid={backdrop} alt="" />
      <div className={styles.list_item_title}>
        {movie.title}{" "}
        <span className={styles.list_item_title_year}>{movie.year}</span>
      </div>
    </li>
  );
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
      movies: [...data.movie.nodes],
    },
    initState
  );

  if (!data.avatar) {
    throw Error(`No avatar found at ${pageContext.avatarPath}`);
  }

  const listHeader = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.left}>
          <header className={styles.page_header}>
            <Img
              fluid={data.avatar.childImageSharp.fluid}
              alt={`An image of ${pageContext.name}`}
              className={styles.avatar}
            />
            <h2 className={styles.page_heading}>{pageContext.name}</h2>
            <p className={styles.page_tagline}>
              <EntityHeader pageContext={pageContext} />
            </p>
          </header>
          <fieldset className={styles.filters}>
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
                <option value="release-date-asc">
                  Release Date (Oldest First)
                </option>
                <option value="release-date-desc">
                  Release Date (Newest First)
                </option>
                <option value="title">Title</option>
              </select>
            </label>
          </fieldset>
          <PaginationInfo
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredMovies.length}
            className={styles.pagination_info}
          />
        </div>
        <div className={styles.right} ref={listHeader}>
          <ul className={styles.list}>
            {state.moviesForPage.map((movie) => {
              const markdownNode = data.backdrop.nodes.find(
                (item) => item.frontmatter.imdbId === movie.imdbId
              );

              if (markdownNode) {
                return <ReviewedListItem review={markdownNode} movie={movie} />;
              }
              return (
                <UnreviewedListItem
                  backdrop={data.defaultBackdrop.childImageSharp.fluid}
                  movie={movie}
                />
              );
            })}
          </ul>
          <PaginationWithButtons
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredMovies.length}
            onClick={(newPage) => {
              dispatch({ type: CHANGE_PAGE, value: newPage });
              if (listHeader && listHeader.current) {
                listHeader.current.scrollIntoView();
              }
            }}
            className={styles.pagination}
          />
        </div>
      </main>
    </Layout>
  );
}

interface PageContext {
  avatarPath: string;
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
  entityType: string;
  imdbIds: [string];
  name: string;
}

interface PageQueryResult {
  avatar: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  backdrop: {
    nodes: MarkdownReview[];
  };
  defaultBackdrop: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  movie: {
    nodes: WatchlistMovie[];
  };
}

export const pageQuery = graphql`
  query($imdbIds: [String], $avatarPath: String) {
    avatar: file(absolutePath: { eq: $avatarPath }) {
      childImageSharp {
        fluid(toFormat: JPG, jpegQuality: 75) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    backdrop: allMarkdownRemark(
      filter: {
        postType: { eq: "REVIEW" }
        frontmatter: { imdb_id: { in: $imdbIds } }
      }
    ) {
      nodes {
        frontmatter {
          imdbId: imdb_id
          grade
          slug
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
    defaultBackdrop: file(absolutePath: { regex: "/backdrops/default.png$/" }) {
      childImageSharp {
        fluid(toFormat: JPG, jpegQuality: 75) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    movie: allWatchlistTitlesJson(
      sort: { fields: [year], order: ASC }
      filter: { imdb_id: { in: $imdbIds } }
    ) {
      nodes {
        imdbId: imdb_id
        title
        year
      }
    }
  }
`;
