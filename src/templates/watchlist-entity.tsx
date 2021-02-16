import { graphql, Link } from "gatsby";
import Img, { FixedObject, FluidObject } from "gatsby-image";
import React, { useReducer, useRef } from "react";
import DebouncedInput from "../components/DebouncedInput";
import Fieldset from "../components/Fieldset";
import FilterPageHeader from "../components/FilterPageHeader";
import Grade from "../components/Grade";
import Label from "../components/Label";
import Layout from "../components/Layout";
import ProgressGraph from "../components/ProgressGraph";
import RangeInput from "../components/RangeInput";
import SelectInput from "../components/SelectInput";
import Seo from "../components/Seo";
import { WatchlistMovie } from "../types";
import applyFilters from "../utils/apply-filters";
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
  /** The active filters. */
  filters: Record<string, (title: WatchlistMovie) => boolean>;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue: string;
};

function initState({ movies }: { movies: WatchlistMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYears(movies);

  return {
    allMovies: movies,
    filteredMovies: movies,
    filters: {},
    minYear,
    maxYear,
    sortValue: "release-date-asc",
  };
}

function WatchlistEntityProgress({
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

function reviewedMovieCount(filteredMovies: WatchlistMovie[]): number {
  return filteredMovies.filter((movie) => movie.reviewedMovie).length;
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";

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

type ActionTypes = FilterTitleAction | FilterReleaseYearAction | SortAction;

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
      };
    }
    case SORT: {
      filteredMovies = sortMovies(state.filteredMovies, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredMovies,
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
      return (
        <>{`Collection of ${pageContext.imdbIds.length} watchlist movies.`}</>
      );
    case "DIRECTOR":
      return (
        <>{`Director of ${pageContext.imdbIds.length} watchlist movies.`}</>
      );
    case "PERFORMER":
      return (
        <>{`Performer in ${pageContext.imdbIds.length} watchlist movies.`}</>
      );
    case "WRITER":
      return (
        <>{`Writing credits on ${pageContext.imdbIds.length} watchlist movies.`}</>
      );
    default:
      throw new Error(
        `Unknown entityType parameter: ${pageContext.entityType}`
      );
  }
}

/**
 * Renders the description for the current entity type.
 */
function buildDescription(name: string, entityType: string): string {
  switch (entityType) {
    case "COLLECTION":
      return `A sortable and filterable list of reviews of movies in the ${name} collection.`;
    case "DIRECTOR":
      return `A sortable and filterable list of reviews of movies directed by ${name}.`;
    case "PERFORMER":
      return `A sortable and filterable list of reviews of movies featuring ${name}.`;
    case "WRITER":
      return `A sortable and filterable list of reviews of movies written (in some part) by ${name}.`;
    default:
      throw new Error(`Unknown entityType parameter: ${entityType}`);
  }
}

function ReviewedListItem({ movie }: { movie: WatchlistMovie }): JSX.Element {
  const review = movie.reviewedMovie;

  return (
    <li>
      <Link
        className={styles.list_item_image_link}
        to={`/reviews/${review.slug}/`}
      >
        {review.backdrop && (
          <Img
            fluid={review.backdrop.childImageSharp.fluid}
            alt={`A still from ${movie.title} (${movie.year})`}
            fadeIn={false}
          />
        )}
      </Link>
      <div className={styles.list_item_title}>
        <Link to={`/reviews/${review.slug}/`}>
          {movie.title}{" "}
          <span className={styles.list_item_title_year}>{movie.year}</span>
        </Link>
      </div>
      <Grade
        grade={review.lastReviewGrade}
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
    <li>
      <Img fluid={backdrop} alt="" fadeIn={false} />
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
export default function WatchlistEntityTemplate({
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
      <Seo
        pageTitle={pageContext.name}
        description={buildDescription(pageContext.name, pageContext.entityType)}
        image={null}
        article={false}
      />
      <main className={styles.container}>
        <div className={styles.left}>
          <FilterPageHeader
            className={styles.page_header}
            avatar={data.avatar.childImageSharp.fixed}
            alt={`An image of ${pageContext.name}`}
            heading={pageContext.name}
            tagline={<EntityHeader pageContext={pageContext} />}
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
            <Label htmlFor="viewings-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="viewings-sort-input"
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
          </Fieldset>
          <div className={styles.percent}>
            <WatchlistEntityProgress
              total={state.filteredMovies.length}
              reviewed={reviewedMovieCount(state.filteredMovies)}
            />
          </div>
        </div>
        <div className={styles.right} ref={listHeader}>
          <ul className={styles.list}>
            {state.filteredMovies.map((movie) => {
              if (movie.reviewedMovie) {
                return <ReviewedListItem movie={movie} />;
              }
              return (
                <UnreviewedListItem
                  backdrop={data.defaultBackdrop.childImageSharp.fluid}
                  movie={movie}
                />
              );
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

interface PageContext {
  avatarPath: string;
  entityType: string;
  imdbIds: [string];
  name: string;
}

interface PageQueryResult {
  avatar: {
    childImageSharp: {
      fixed: FixedObject;
    };
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
        fixed(toFormat: JPG, width: 200, height: 200, quality: 80) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }

    defaultBackdrop: file(absolutePath: { regex: "/backdrops/default.png$/" }) {
      childImageSharp {
        fluid(
          toFormat: JPG
          jpegQuality: 80
          srcSetBreakpoints: [151, 184, 238, 302, 368, 476, 642]
          maxWidth: 321
          sizes: "(max-width: 379px) 321px, (max-width: 555px) 238px, (max-width: 1279) 184px, (max-width: 1343px) 238px, 151px"
        ) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    movie: allWatchlistMoviesJson(
      sort: { fields: [year], order: ASC }
      filter: { imdb_id: { in: $imdbIds } }
    ) {
      nodes {
        imdbId: imdb_id
        title
        year
        reviewedMovie {
          lastReviewGrade: last_review_grade
          slug
          backdrop {
            childImageSharp {
              fluid(
                toFormat: JPG
                jpegQuality: 80
                srcSetBreakpoints: [151, 184, 238, 302, 368, 476, 642]
                maxWidth: 321
                sizes: "(max-width: 379px) 321px, (max-width: 555px) 238px, (max-width: 1279) 184px, (max-width: 1343px) 238px, 151px"
              ) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
