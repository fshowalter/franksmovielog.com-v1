import { graphql, Link } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer } from "react";
import Button from "../Button";
import DebouncedInput from "../DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Layout from "../Layout";
import { Poster, PosterList } from "../PosterList";
import ProgressGraph from "../ProgressGraph";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
import YearInput from "../YearInput";
import {
  breadcrumbCss,
  containerCss,
  filtersCss,
  leftCss,
  listHeaderGroupCss,
  listInfoCss,
  pageHeaderCss,
  percentCss,
  percentTotalsCss,
  rightCss,
  showMoreCss,
} from "./WatchlistEntityPage.module.scss";
import reducer, {
  ActionType,
  initState,
  SortType,
} from "./WatchlistEntityPage.reducer";

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

function groupForMovie(movie: WatchlistMovie, sortType: SortType): string {
  switch (sortType) {
    case "release-date-asc":
    case "release-date-desc": {
      return movie.releaseDate.substring(0, 4);
    }
    case "grade-asc":
    case "grade-desc": {
      return movie.lastReviewGrade || "Unrated";
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
  sortType,
}: {
  movies: WatchlistMovie[];
  sortType: SortType;
}): Map<string, WatchlistMovie[]> {
  const groupedMovies: Map<string, WatchlistMovie[]> = new Map();

  movies.map((movie) => {
    const group = groupForMovie(movie, sortType);
    let groupValue = groupedMovies.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedMovies.set(group, groupValue);
    }
    groupValue.push(movie);
  });

  return groupedMovies;
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

export enum EntityType {
  DIRECTOR = "director",
  PERFORMER = "performer",
  WRITER = "writer",
  COLLECTION = "collection",
}

function detailsForEntityType(
  entityType: EntityType,
  name: string,
  movieCount: number
) {
  const details = {
    tagLine: "",
    description: "",
    kind: "",
  };

  const tagLine = (prefix: string) =>
    `${prefix} ${movieCount} watchlist movies.`;

  const personDescription = (verb: string) =>
    `A sortable and filterable list of reviews of movies ${verb} ${name}.`;

  switch (entityType) {
    case EntityType.DIRECTOR: {
      details.tagLine = tagLine("Director of");
      details.description = personDescription("directed by");
      details.kind = "Directors";
      return details;
    }
    case EntityType.PERFORMER: {
      details.tagLine = tagLine("Performer in");
      details.description = personDescription("featuring");
      details.kind = "Performers";
      return details;
    }
    case EntityType.WRITER: {
      details.tagLine = tagLine("Writer on");
      details.description = personDescription("written (in some part) by");
      details.kind = "Writers";
      return details;
    }
    case EntityType.COLLECTION: {
      details.tagLine = tagLine("Collection of");
      details.description = `A sortable and filterable list of reviews of movies in the ${name} collection.`;
      details.kind = "Collections";
      return details;
    }
  }
}

/**
 * Renders a page for a watchlist director.
 */
export default function WatchlistEntityPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const entity = data.entity.nodes[0];

  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...entity.watchlistMovies],
    },
    initState
  );

  if (!entity.avatar) {
    throw Error(`No avatar found for ${entity.name}.`);
  }

  const entityDetails = detailsForEntityType(
    pageContext.entityType,
    entity.name,
    entity.watchlistMovies.length
  );

  const groupedMovies = groupMovies({
    movies: state.filteredMovies.slice(0, state.showCount),
    sortType: state.sortType,
  });

  return (
    <Layout>
      <Seo
        pageTitle={entity.name}
        description={entityDetails.description}
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <div className={breadcrumbCss}>
            <Link to="/watchlist/">Watchlist</Link> /{" "}
            <Link to={`/watchlist/${entityDetails.kind.toLowerCase()}`}>
              {entityDetails.kind}
            </Link>
          </div>
          <FilterPageHeader
            className={pageHeaderCss}
            avatar={entity.avatar.childImageSharp.gatsbyImageData}
            alt={`An image of ${entity.name}`}
            heading={entity.name}
            tagline={entityDetails.tagLine}
          />
          <div className={filtersCss}>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Title"
                placeholder="Enter all or part of a title"
                onChange={(value) =>
                  dispatch({ type: ActionType.FILTER_TITLE, value })
                }
              />
              <YearInput
                label="Release Year"
                years={data.entity.releaseYears}
                onChange={(values) =>
                  dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
                }
              />
              <SelectInput
                value={state.sortType}
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
                <option value="grade-desc">Grade (Best First)</option>
                <option value="grade-asc">Grade (Worst First)</option>
              </SelectInput>
            </Fieldset>
            <div className={listInfoCss}>
              <ListInfo
                visible={state.showCount}
                total={state.filteredMovies.length}
              />
            </div>
            <div className={percentCss}>
              <WatchlistEntityProgress
                total={state.filteredMovies.length}
                reviewed={state.reviewedMovieCount}
              />
            </div>
          </div>
        </div>
        <div className={rightCss}>
          <ol data-testid="movie-list">
            {[...groupedMovies].map(([group, movies], index) => {
              return (
                <li key={group}>
                  <div
                    className={listHeaderGroupCss}
                    style={{ zIndex: index + 100 }}
                  >
                    {group}
                  </div>
                  <PosterList>
                    {movies.map((movie) => {
                      return (
                        <Poster
                          key={movie.imdbId}
                          title={movie.title}
                          year={movie.year}
                          slug={movie.reviewedMovieSlug}
                          grade={movie.lastReviewGrade}
                          image={movie.poster}
                        />
                      );
                    })}
                  </PosterList>
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

interface PageContext {
  entityType: EntityType;
}

type WatchlistMovieBase = {
  imdbId: string;
  title: string;
  year: number;
  sortTitle: string;
  releaseDate: string;
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

type UnreviewedWatchlistMovie = {
  lastReviewGrade: null;
  lastReviewGradeValue: null;
  reviewedMovieSlug: null;
} & WatchlistMovieBase;

type ReviewedWatchlistMovie = {
  lastReviewGrade: string;
  lastReviewGradeValue: number;
  reviewedMovieSlug: string;
} & WatchlistMovieBase;

export type WatchlistMovie = UnreviewedWatchlistMovie | ReviewedWatchlistMovie;

interface PageQueryResult {
  entity: {
    nodes: {
      name: string;
      avatar: null | {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      watchlistMovies: WatchlistMovie[];
    }[];
    releaseYears: string[];
  };
}

export const pageQuery = graphql`
  query ($slug: String!, $entityType: String!) {
    entity: allWatchlistEntitiesJson(
      filter: { entity_type: { eq: $entityType }, slug: { eq: $slug } }
      limit: 1
    ) {
      nodes {
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
        watchlistMovies {
          imdbId: imdb_id
          title
          year
          lastReviewGrade
          lastReviewGradeValue
          reviewedMovieSlug
          sortTitle: sort_title
          releaseDate: release_date
          poster {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [JPG, AVIF]
                quality: 80
                width: 200
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
      releaseYears: distinct(field: watchlistMovies___year)
    }
  }
`;
