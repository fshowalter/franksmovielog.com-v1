import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer } from "react";
import DebouncedInput from "../../components/DebouncedInput";
import Fieldset from "../../components/Fieldset";
import FilterPageHeader from "../../components/FilterPageHeader";
import Grade from "../../components/Grade";
import Label from "../../components/Label";
import Layout from "../../components/Layout";
import ProgressGraph from "../../components/ProgressGraph";
import RangeInput from "../../components/RangeInput";
import SelectInput from "../../components/SelectInput";
import Seo from "../../components/Seo";
import applyFilters from "../../utils/apply-filters";
import {
  collator,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listItemGradeCss,
  listItemImageLinkCss,
  listItemTitleCss,
  listItemTitleYearCss,
  pageHeaderCss,
  percentCss,
  percentTotalsCss,
  rightCss,
} from "./writer.module.scss";

type SortType = "release-date-asc" | "release-date-desc" | "title";

function sortMovies(titles: WatchlistMovie[], sortType: SortType) {
  const sortMap: Record<
    SortType,
    (a: WatchlistMovie, b: WatchlistMovie) => number
  > = {
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
  };

  const comparer = sortMap[sortType];

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

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

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
  /** The active sort type. */
  sortType: SortType;
};

function initState({ movies }: { movies: WatchlistMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYears(movies);

  return {
    allMovies: movies,
    filteredMovies: movies,
    filters: {},
    minYear,
    maxYear,
    sortType: "release-date-asc",
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
      <div className={percentTotalsCss}>
        {reviewed}/{total} Reviewed
      </div>
    </>
  );
}

function reviewedMovieCount(filteredMovies: WatchlistMovie[]): number {
  return filteredMovies.filter((movie) => movie.slug).length;
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
  value: SortType;
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
        state.sortType
      );
      return {
        ...state,
        filters,
        filteredMovies,
      };
    }
    case FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (review: WatchlistMovie) => {
          const releaseYear = review.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortType
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
        sortType: action.value,
        filteredMovies,
      };
    }
    // no default
  }
}

function ListItem({
  movie,
  defaultBackdrop,
}: {
  movie: WatchlistMovie;
  defaultBackdrop: IGatsbyImageData;
}): JSX.Element {
  if (movie.slug && movie.lastReviewGrade) {
    return (
      <li>
        <Link className={listItemImageLinkCss} to={`/reviews/${movie.slug}/`}>
          {movie.backdrop && (
            <GatsbyImage
              image={movie.backdrop.childImageSharp.gatsbyImageData}
              alt={`A still from ${movie.title} (${movie.year})`}
            />
          )}
        </Link>
        <div className={listItemTitleCss}>
          <Link to={`/reviews/${movie.slug}/`}>
            {movie.title}{" "}
            <span className={listItemTitleYearCss}>{movie.year}</span>
          </Link>
        </div>
        <Grade grade={movie.lastReviewGrade} className={listItemGradeCss} />
      </li>
    );
  }

  return (
    <li>
      <GatsbyImage image={defaultBackdrop} alt="An unreviewed title." />
      <div className={listItemTitleCss}>
        {movie.title} <span className={listItemTitleYearCss}>{movie.year}</span>
      </div>
    </li>
  );
}

/**
 * Renders a page for a watchlist director.
 */
export default function WatchlistDirectorTemplate({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...data.movie.nodes],
    },
    initState
  );

  if (!data.performer.avatar) {
    throw Error(`No avatar found for ${data.performer.name}.`);
  }

  return (
    <Layout>
      <Seo
        pageTitle={data.performer.name}
        description={`A sortable and filterable list of reviews of movies featuring ${data.performer.name}.`}
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            avatar={data.performer.avatar.childImageSharp.gatsbyImageData}
            alt={`An image of ${data.performer.name}`}
            heading={data.performer.name}
            tagline={`Performer in ${data.movie.nodes.length} watchlist movies.`}
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="watchlist-performer-title-input">
              Title
              <DebouncedInput
                id="watchlist-performer-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
              />
            </Label>
            <RangeInput
              label="Release Year"
              id="watchlist-performer-release-year-input"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: FILTER_RELEASE_YEAR, values })
              }
            />
            <Label htmlFor="watchlist-performer-sort-input">
              Order By
              <SelectInput
                value={state.sortType}
                id="watchlist-performer-sort-input"
                onChange={(e) =>
                  dispatch({ type: SORT, value: e.target.value as SortType })
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
          <div className={percentCss}>
            <WatchlistEntityProgress
              total={state.filteredMovies.length}
              reviewed={reviewedMovieCount(state.filteredMovies)}
            />
          </div>
        </div>
        <div className={rightCss}>
          <ul data-testid="movie-list" className={listCss}>
            {state.filteredMovies.map((movie) => {
              return (
                <ListItem
                  key={movie.imdbId}
                  defaultBackdrop={
                    data.defaultBackdrop.childImageSharp.gatsbyImageData
                  }
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

type WatchlistMovie = {
  imdbId: string;
  title: string;
  year: number;
  lastReviewGrade: null | string;
  sortTitle: string;
  slug: null | string;
  releaseDate: string;
  backdrop: null | {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

interface PageQueryResult {
  performer: {
    name: string;
    avatar: null | {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  defaultBackdrop: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  movie: {
    nodes: WatchlistMovie[];
  };
}

export const pageQuery = graphql`
  query ($imdbId: String!) {
    performer: watchlistEntitiesJson(
      entity_type: { eq: "performer" }
      imdb_id: { eq: $imdbId }
    ) {
      name
      avatar {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            formats: [JPG, AVIF]
            quality: 80
            width: 200
            height: 200
            placeholder: TRACED_SVG
          )
        }
      }
    }

    defaultBackdrop: file(absolutePath: { regex: "/backdrops/default.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          breakpoints: [151, 184, 238, 302, 321, 368, 476, 642]
          width: 321
          placeholder: TRACED_SVG
          sizes: "(max-width: 379px) 321px, (max-width: 555px) 238px, (max-width: 1279) 184px, (max-width: 1343px) 238px, 151px"
        )
      }
    }

    movie: allWatchlistMoviesJson(
      sort: { fields: [release_date], order: ASC }
      filter: { performer_imdb_ids: { in: [$imdbId] } }
    ) {
      nodes {
        imdbId: imdb_id
        title
        year
        lastReviewGrade: last_review_grade
        slug: reviews_slug
        sortTitle: sort_title
        releaseDate: release_date
        backdrop {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [JPG, AVIF]
              quality: 80
              breakpoints: [151, 184, 238, 302, 321, 368, 476, 642]
              width: 321
              placeholder: TRACED_SVG
              sizes: "(max-width: 379px) 321px, (max-width: 555px) 238px, (max-width: 1279) 184px, (max-width: 1343px) 238px, 151px"
            )
          }
        }
      }
    }
  }
`;
