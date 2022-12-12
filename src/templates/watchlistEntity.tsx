import { graphql } from "gatsby";
import { useReducer } from "react";
import {
  Box,
  Button,
  DebouncedInput,
  Fieldset,
  GraphqlImage,
  HeadBuilder,
  Layout,
  Link,
  Poster,
  PosterList,
  ProgressGraph,
  SelectField,
  Spacer,
  YearInput,
} from "../components";
import { foregroundColors } from "../styles/colors.css";
import { HEADER_HEIGHT } from "../styles/sizes";
import reducer, {
  ActionType,
  initState,
  SortType,
} from "./watchlistEntity.reducer";

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

  return <div>{showingText}</div>;
}

function groupForMovie(
  movie: Queries.WatchlistEntityMovieFragment,
  sortType: SortType
): string {
  switch (sortType) {
    case "release-date-asc":
    case "release-date-desc": {
      return movie.releaseDate.substring(0, 4);
    }
    case "grade-asc":
    case "grade-desc": {
      return movie.grade ?? "Unrated";
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
  movies: Queries.WatchlistEntityMovieFragment[];
  sortType: SortType;
}): Map<string, Queries.WatchlistEntityMovieFragment[]> {
  const groupedMovies = new Map<
    string,
    Queries.WatchlistEntityMovieFragment[]
  >();

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

export function Head({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: Queries.WatchlistEntityPageQuery;
}): JSX.Element {
  const entity = data.entity;

  const entityDetails = detailsForEntityType(
    pageContext.entityType,
    entity.name,
    entity.watchlistMovies.length
  );

  return (
    <HeadBuilder
      pageTitle={entity.name}
      description={entityDetails.description}
      image={null}
      article={false}
    />
  );
}

/**
 * Renders a page for a watchlist director.
 */
export default function WatchlistEntityPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: Queries.WatchlistEntityPageQuery;
}): JSX.Element {
  const entity = data.entity;

  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...entity.watchlistMovies],
    },
    initState
  );

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
      <Box
        as="main"
        display="flex"
        flexDirection={{ default: "column", desktop: "row" }}
        paddingX={{ default: 0, desktop: "gutter" }}
        columnGap={64}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingX={{ default: "gutter", desktop: 0 }}
          paddingTop={32}
          flexBasis={320}
        >
          <Box maxWidth="prose">
            <Box>
              <Link to="/watchlist/">Watchlist</Link> /{" "}
              <Link to={`/watchlist/${entityDetails.kind.toLowerCase()}`}>
                {entityDetails.kind}
              </Link>
            </Box>
            <Spacer axis="vertical" size={16} />
            <GraphqlImage
              image={entity.avatar}
              alt={entity.name}
              maxWidth={200}
              borderRadius="half"
              transform="safariBorderRadiusFix"
            />
            <Spacer axis="vertical" size={16} />
            <Box as="h1" fontSize="pageTitle">
              {entity.name}
            </Box>
            <Spacer axis="vertical" size={24} />
            <Box color="subtle">{entityDetails.tagLine}</Box>
          </Box>
          <Spacer axis="vertical" size={32} />
          <Box>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Title"
                placeholder="Enter all or part of a title"
                onInputChange={(value) =>
                  dispatch({ type: ActionType.FILTER_TITLE, value })
                }
              />
              <YearInput
                label="Release Year"
                years={data.distinct.releaseYears}
                onYearChange={(values) =>
                  dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
                }
              />
              <SelectField
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
              </SelectField>
            </Fieldset>
            <Box color="subtle" paddingX="gutter" textAlign="center">
              <Spacer axis="vertical" size={32} />
              <ListInfo
                visible={state.showCount}
                total={state.filteredMovies.length}
              />
              <Spacer axis="vertical" size={32} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <ProgressGraph
                total={state.filteredMovies.length}
                complete={state.reviewedMovieCount}
                width={160}
                height={160}
              />
              <Spacer axis="vertical" size={24} />
              <Box color="subtle" textAlign="center" fontSize="normal">
                {state.reviewedMovieCount}/
                {state.filteredMovies.length.toLocaleString()} Reviewed
              </Box>
            </Box>
          </Box>
        </Box>
        <Box name="list" display="flex" flexDirection="column" flexGrow={1}>
          <Box as="ol" data-testid="movie-list" padding={0}>
            {[...groupedMovies].map(([group, movies], index) => {
              return (
                <Box as="li" key={group} display="block">
                  <Box
                    fontSize="groupHeading"
                    style={{ zIndex: index + 100 }}
                    paddingTop={{ default: 0, desktop: 16 }}
                    position="sticky"
                    backgroundColor="default"
                    top={{ default: 0, desktop: HEADER_HEIGHT }}
                  >
                    <Box
                      backgroundColor="canvas"
                      paddingY={8}
                      paddingX={{ default: "gutter", desktop: 24 }}
                    >
                      {group}
                    </Box>
                  </Box>
                  <Spacer axis="vertical" size={16} />
                  <PosterList
                    paddingLeft={{ default: "gutter", desktop: 24 }}
                    paddingRight={{ default: "gutter", desktop: 0 }}
                  >
                    {movies.map((movie) => {
                      return (
                        <Poster
                          key={movie.imdbId}
                          title={movie.title}
                          year={movie.year}
                          slug={movie.slug}
                          grade={movie.grade}
                          image={movie.poster}
                        />
                      );
                    })}
                  </PosterList>
                </Box>
              );
            })}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Spacer axis="vertical" size={32} />
            {state.filteredMovies.length > state.showCount && (
              <>
                <Button
                  paddingX="gutter"
                  onClick={() => dispatch({ type: ActionType.SHOW_MORE })}
                  display="flex"
                  columnGap={16}
                >
                  <svg
                    width="24"
                    height="24"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={foregroundColors.accent}
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                  </svg>
                  Show More...
                </Button>
                <Spacer axis="vertical" size={32} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

interface PageContext {
  entityType: EntityType;
}

export const pageQuery = graphql`
  fragment WatchlistEntityMovie on WatchlistMoviesJson {
    imdbId
    title
    year
    grade
    gradeValue
    slug
    sortTitle
    releaseDate
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

  query WatchlistEntityPage($slug: String!, $entityType: String!) {
    distinct: allWatchlistEntitiesJson(
      filter: { entityType: { eq: $entityType }, slug: { eq: $slug } }
      limit: 1
    ) {
      releaseYears: distinct(field: { watchlistMovies: { year: SELECT } })
    }
    entity: watchlistEntity(entityType: $entityType, slug: $slug) {
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
        ...WatchlistEntityMovie
      }
    }
  }
`;
