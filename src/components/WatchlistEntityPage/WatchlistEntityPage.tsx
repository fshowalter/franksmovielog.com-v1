import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer } from "react";
import DebouncedInput from "../DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Grade from "../Grade";
import Layout from "../Layout";
import ProgressGraph from "../ProgressGraph";
import RangeInput from "../RangeInput";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
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
} from "./WatchlistEntityPage.module.scss";
import reducer, {
  ActionType,
  initState,
  SortType,
} from "./WatchlistEntityPage.reducer";

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

function ListItem({ movie }: { movie: WatchlistMovie }): JSX.Element {
  if (movie.reviewedMovieSlug) {
    return (
      <li>
        <Link
          className={listItemImageLinkCss}
          to={`/reviews/${movie.reviewedMovieSlug}/`}
        >
          {movie.backdrop && (
            <GatsbyImage
              image={movie.backdrop.childImageSharp.gatsbyImageData}
              alt={`A still from ${movie.title} (${movie.year})`}
            />
          )}
        </Link>
        <div className={listItemTitleCss}>
          <Link to={`/reviews/${movie.reviewedMovieSlug}/`}>
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
      <GatsbyImage
        image={movie.backdrop.childImageSharp.gatsbyImageData}
        alt="An unreviewed title."
      />
      <div className={listItemTitleCss}>
        {movie.title} <span className={listItemTitleYearCss}>{movie.year}</span>
      </div>
    </li>
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
  };

  const tagLine = (prefix: string) =>
    `${prefix} ${movieCount} watchlist movies.`;

  const personDescription = (verb: string) =>
    `A sortable and filterable list of reviews of movies ${verb} ${name}.`;

  switch (entityType) {
    case EntityType.DIRECTOR: {
      details.tagLine = tagLine("Director of");
      details.description = personDescription("directed by");
      return details;
    }
    case EntityType.PERFORMER: {
      details.tagLine = tagLine("Performer in");
      details.description = personDescription("featuring");
      return details;
    }
    case EntityType.WRITER: {
      details.tagLine = tagLine("Writer on");
      details.description = personDescription("written (in some part) by");
      return details;
    }
    case EntityType.COLLECTION: {
      details.tagLine = tagLine("Collection of");
      details.description = `A sortable and filterable list of reviews of movies in the ${name} collection.`;
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
  const { entity } = data;

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
          <FilterPageHeader
            className={pageHeaderCss}
            avatar={entity.avatar.childImageSharp.gatsbyImageData}
            alt={`An image of ${entity.name}`}
            heading={entity.name}
            tagline={entityDetails.tagLine}
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <DebouncedInput
              label="Title"
              placeholder="Enter all or part of a title"
              onChange={(value) =>
                dispatch({ type: ActionType.FILTER_TITLE, value })
              }
            />
            <RangeInput
              label="Release Year"
              min={state.minYear}
              max={state.maxYear}
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
            </SelectInput>
          </Fieldset>
          <div className={percentCss}>
            <WatchlistEntityProgress
              total={state.filteredMovies.length}
              reviewed={state.reviewedMovieCount}
            />
          </div>
        </div>
        <div className={rightCss}>
          <ul data-testid="movie-list" className={listCss}>
            {state.filteredMovies.map((movie) => {
              return <ListItem key={movie.imdbId} movie={movie} />;
            })}
          </ul>
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
  backdrop: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

type UnreviewedWatchlistMovie = {
  lastReviewGrade: null;
  reviewedMovieSlug: null;
} & WatchlistMovieBase;

type ReviewedWatchlistMovie = {
  lastReviewGrade: string;
  reviewedMovieSlug: string;
} & WatchlistMovieBase;

export type WatchlistMovie = UnreviewedWatchlistMovie | ReviewedWatchlistMovie;

interface PageQueryResult {
  entity: {
    name: string;
    avatar: null | {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    watchlistMovies: WatchlistMovie[];
  };
}

export const pageQuery = graphql`
  query ($slug: String!, $entityType: String!) {
    entity: watchlistEntitiesJson(
      entity_type: { eq: $entityType }
      slug: { eq: $slug }
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
      watchlistMovies {
        imdbId: imdb_id
        title
        year
        lastReviewGrade
        reviewedMovieSlug
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
