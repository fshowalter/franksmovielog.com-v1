import { graphql } from "gatsby";
import { useReducer, useRef } from "react";
import Select from "react-select";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { HEADER_HEIGHT } from "../../styles/sizes";
import { Box } from "../Box";
import { Button } from "../Button";
import { DebouncedInput } from "../DebouncedInput/DebouncedInput";
import { Fieldset } from "../Fieldset";
import { HeadBuilder } from "../HeadBuilder";
import { LabelText } from "../LabelText";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { Poster, PosterList } from "../PosterList";
import { SelectField } from "../SelectField";
import { Spacer } from "../Spacer";
import { YearInput } from "../YearInput";
import type { SortType } from "./UnderseenGemsPage.reducer";
import reducer, { ActionTypes, initState } from "./UnderseenGemsPage.reducer";

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
  movie: Queries.UnderseenGemsMovieFragment,
  sortValue: SortType
): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return movie.releaseDate.substring(0, 4);
    }
    case "grade-asc":
    case "grade-desc": {
      return movie.grade || "Unrated";
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
  sortValue,
}: {
  movies: Queries.UnderseenGemsMovieFragment[];
  sortValue: SortType;
}): Map<string, Queries.UnderseenGemsMovieFragment[]> {
  const groupedMovies = new Map<string, Queries.UnderseenGemsMovieFragment[]>();

  movies.map((movie) => {
    const group = groupForMovie(movie, sortValue);
    let groupValue = groupedMovies.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedMovies.set(group, groupValue);
    }
    groupValue.push(movie);
  });

  return groupedMovies;
}

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Underseen Gems"
      description="Four and five star movies with a below average number of votes on the IMDb."
      image={null}
      article={false}
    />
  );
}

/**
 * Renders the underseen gems page.
 */
export default function UnderseenGemsPage({
  data,
}: {
  data: Queries.UnderseenGemsPageQuery;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...data.movie.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  const groupedMovies = groupMovies({
    movies: state.filteredMovies.slice(0, state.showCount),
    sortValue: state.sortValue,
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
            <Link color="accent" textDecoration="none" to="/reviews/">
              Reviews
            </Link>
            <Spacer axis="vertical" size={16} />
            <Box as="h1" fontSize="pageTitle">
              Underseen Gems
            </Box>
            <Spacer axis="vertical" size={16} />
            <Box color="subtle">
              <Box as="q" fontWeight="semiBold">
                My God, it&apos;s full of stars!
              </Box>
              <Spacer axis="vertical" size={16} />
              <p>
                Four and five star movies with a below average number of IMDb
                votes.
              </p>
            </Box>
          </Box>
          <Spacer axis="vertical" size={32} />
          <Box>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Title"
                placeholder="Enter all or part of a title"
                onInputChange={(value) =>
                  dispatch({ type: ActionTypes.FILTER_TITLE, value })
                }
              />
              <YearInput
                label="Release Year"
                years={data.movie.releaseYears}
                onYearChange={(values) =>
                  dispatch({ type: ActionTypes.FILTER_RELEASE_YEAR, values })
                }
              />
              <Box display="flex" flexDirection="column" textAlign="left">
                <LabelText text="Genres" as="label" htmlFor="genres" />
                <Select
                  inputId="genres"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                      ...theme.colors,
                      neutral0: backgroundColors.subtle,
                      neutral20: borderColors.default,
                      neutral50: foregroundColors.subtle,
                      danger: foregroundColors.accent,
                      primary25: backgroundColors.stripe,
                    },
                  })}
                  classNamePrefix="reactSelect"
                  isSearchable={false}
                  onChange={(e) =>
                    dispatch({
                      type: ActionTypes.FILTER_GENRES,
                      values: e.map((selection) => selection.value),
                    })
                  }
                  isMulti={true}
                  options={data.movie.genres.map((genre) => {
                    return { value: genre, label: genre };
                  })}
                />
              </Box>
              <SelectField
                value={state.sortValue}
                label="Order By"
                onChange={(e) =>
                  dispatch({
                    type: ActionTypes.SORT,
                    value: e.target.value as SortType,
                  })
                }
              >
                <option value="release-date-desc">
                  Release Date (Newest First)
                </option>
                <option value="release-date-asc">
                  Release Date (Oldest First)
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
          </Box>
        </Box>
        <Box
          name="list"
          innerRef={listHeader}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Box as="ol" data-testid="movies-list" padding={0}>
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
                          grade={movie.grade}
                          slug={movie.slug}
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
                  onClick={() => dispatch({ type: ActionTypes.SHOW_MORE })}
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

export const pageQuery = graphql`
  fragment UnderseenGemsMovie on UnderseenGemsJson {
    releaseDate
    title
    year
    sortTitle
    slug
    grade
    gradeValue
    imdbId
    genres
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

  query UnderseenGemsPage {
    movie: allUnderseenGemsJson(sort: { fields: [releaseDate], order: DESC }) {
      nodes {
        ...UnderseenGemsMovie
      }
      releaseYears: distinct(field: year)
      genres: distinct(field: genres)
    }
  }
`;
