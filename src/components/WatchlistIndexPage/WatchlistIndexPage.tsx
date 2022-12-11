import { graphql } from "gatsby";
import { useReducer, useRef } from "react";
import { foregroundColors } from "../../styles/colors.css";
import { HEADER_HEIGHT } from "../../styles/sizes";
import toSentenceArray from "../../utils/to-sentence-array";
import { Box, IBoxProps } from "../Box";
import { Button } from "../Button";
import { DebouncedInput } from "../DebouncedInput/DebouncedInput";
import { Fieldset } from "../Fieldset";
import { HeadBuilder } from "../HeadBuilder";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { Poster, PosterList } from "../PosterList";
import ProgressGraph from "../ProgressGraph";
import { SelectField, SelectOptions } from "../SelectField";
import { Spacer } from "../Spacer";
import { YearInput } from "../YearInput";
import type { SortType } from "./WatchlistIndexPage.reducer";
import reducer, { ActionType, initState } from "./WatchlistIndexPage.reducer";

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

  return <Box>{showingText}</Box>;
}

function groupForMovie(
  movie: Queries.WatchlistMovieFragment,
  sortValue: SortType
): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return movie.releaseDate.substring(0, 4);
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
  movies: Queries.WatchlistMovieFragment[];
  sortValue: SortType;
}): Map<string, Queries.WatchlistMovieFragment[]> {
  const groupedMovies: Map<string, Queries.WatchlistMovieFragment[]> =
    new Map();

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

/**
 * Formats a given collection of watchlist person names to a sentence with
 * commas and conjunction if necessary.
 * @param people The people to format.
 * @param suffix The suffix to append to the formed sentence.
 */
function formatPeopleNames(
  names: readonly string[],
  suffix: string | string[]
): string[] {
  if (names.length === 0) {
    return [""];
  }

  let append;

  if (Array.isArray(suffix)) {
    append = names.length > 1 ? suffix[1] : suffix[0];
  } else {
    append = suffix;
  }

  return [`${toSentenceArray(names).join("")} ${append}`];
}

/**
 * Formats a given collection of watchlist collection names to a sentence with
 * commas and conjunction if necessary.
 * @param collections The collections to format.
 */
function formatCollectionNames(names: readonly string[]): string | string[] {
  if (names.length === 0) {
    return "";
  }

  const suffix = names.length > 1 ? "collections" : "collection";

  return [`it's in the ${toSentenceArray(names).join("")} ${suffix}`];
}

/**
 * Renders a watchlist title slug.
 */
function WatchlistMovieSlug({
  movie,
}: {
  movie: Queries.WatchlistMovieFragment;
}): JSX.Element {
  const credits = [
    ...formatPeopleNames(movie.directorNames, "directed"),
    ...formatPeopleNames(movie.performerNames, "performed"),
    ...formatPeopleNames(movie.writerNames, [
      "has a writing credit",
      "have writing credits",
    ]),
    ...formatCollectionNames(movie.collectionNames),
  ];

  return (
    <Box color="subtle" fontSize="xSmall" fontWeight="light" lineHeight={16}>
      Because {toSentenceArray(credits)}.
    </Box>
  );
}

interface IWatchlistProgressProps extends IBoxProps {
  total: number;
  reviewed: number;
}

function WatchlistProgress({
  total,
  reviewed,
  ...rest
}: IWatchlistProgressProps): JSX.Element {
  return (
    <Box {...rest}>
      <ProgressGraph
        total={total}
        complete={reviewed}
        width={160}
        height={160}
      />
      <Spacer axis="vertical" size={24} />
      <Box color="subtle" textAlign="center" fontSize="normal">
        {reviewed}/{total.toLocaleString()} Reviewed
      </Box>
    </Box>
  );
}

function reviewedMovieCount(
  filteredMovies: Queries.WatchlistMovieFragment[]
): number {
  const reviewedMovies = filteredMovies.filter((m) => m.reviewedMovie?.slug);

  return reviewedMovies.length;
}

interface IWatchlistEntityTypeLinkItem extends IBoxProps {
  to: string;
}

function WatchlistPeopleLinkItem({
  to,
  children,
  ...rest
}: IWatchlistEntityTypeLinkItem): JSX.Element {
  return (
    <Box as="li" display="block" {...rest}>
      <Link
        to={to}
        display="flex"
        columnGap={16}
        color="accent"
        boxShadow="borderAll"
        paddingX={16}
        paddingY={8}
        borderRadius={8}
        textDecoration="none"
      >
        <Box flexShrink={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={foregroundColors.default}
            width={20}
            height={20}
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        </Box>
        {children}
      </Link>
    </Box>
  );
}

function WatchlistCollectionLinkItem({
  to,
  children,
  ...rest
}: IWatchlistEntityTypeLinkItem): JSX.Element {
  return (
    <Box as="li" display="block" {...rest}>
      <Link
        to={to}
        display="flex"
        columnGap={16}
        color="accent"
        boxShadow="borderAll"
        paddingX={16}
        paddingY={8}
        borderRadius={8}
        textDecoration="none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={foregroundColors.default}
          width={20}
          height={20}
        >
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
        {children}
      </Link>
    </Box>
  );
}

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Watchlist"
      description="My movie review bucketlist."
      image={null}
      article={false}
    />
  );
}

/**
 * Renders the watchlist page.
 */
export default function WatchlistIndexPage({
  data,
}: {
  data: Queries.WatchlistIndexPageQuery;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...data.watchlist.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);
  const reviewedCount = reviewedMovieCount(state.filteredMovies);
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
            <Box as="h1" fontSize="pageTitle">
              Watchlist
            </Box>
            <Spacer axis="vertical" size={24} />
            <Box color="subtle">
              <q>A man&apos;s got to know his limitations.</q>
              <p>
                My movie review bucketlist.{" "}
                {state.allMovies.length.toLocaleString()} titles. No silents or
                documentaries.{" "}
              </p>
            </Box>
          </Box>
          <Spacer axis="vertical" size={32} />
          <Box
            as="ul"
            padding={0}
            display="flex"
            flexWrap="wrap"
            columnGap={32}
            rowGap={24}
          >
            <WatchlistPeopleLinkItem
              flexGrow={1}
              flexShrink={0}
              to="/watchlist/directors/"
            >
              Directors
            </WatchlistPeopleLinkItem>

            <WatchlistPeopleLinkItem
              flexGrow={1}
              flexShrink={0}
              to="/watchlist/performers/"
            >
              Performers
            </WatchlistPeopleLinkItem>

            <WatchlistPeopleLinkItem
              flexGrow={1}
              flexShrink={0}
              to="/watchlist/writers/"
            >
              Writers
            </WatchlistPeopleLinkItem>

            <WatchlistCollectionLinkItem
              flexGrow={1}
              flexShrink={0}
              to="/watchlist/collections/"
            >
              Collections
            </WatchlistCollectionLinkItem>
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
              <SelectField
                label="Director"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_DIRECTOR,
                    value: e.target.value,
                  })
                }
              >
                <SelectOptions options={data.watchlist.directors} />
              </SelectField>
              <SelectField
                label="Performer"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_PERFORMER,
                    value: e.target.value,
                  })
                }
              >
                <SelectOptions options={data.watchlist.performers} />
              </SelectField>
              <SelectField
                label="Writer"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_WRITER,
                    value: e.target.value,
                  })
                }
              >
                <SelectOptions options={data.watchlist.writers} />
              </SelectField>
              <SelectField
                label="Collection"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.FILTER_COLLECTION,
                    value: e.target.value,
                  })
                }
              >
                <SelectOptions options={data.watchlist.collections} />
              </SelectField>
              <YearInput
                label="Release Year"
                years={data.watchlist.releaseYears}
                onYearChange={(values) =>
                  dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
                }
              />
              <SelectField
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
              <WatchlistProgress
                total={state.filteredMovies.length}
                reviewed={reviewedCount}
              />
              {(reviewedCount > 0 || state.hideReviewed) && (
                <>
                  <Spacer axis="vertical" size={24} />
                  <Button
                    paddingX={24}
                    onClick={() =>
                      dispatch({ type: ActionType.TOGGLE_REVIEWED })
                    }
                  >
                    {state.hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
                  </Button>
                </>
              )}
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
                          slug={movie.reviewedMovie?.slug}
                          image={movie.poster}
                          details={<WatchlistMovieSlug movie={movie} />}
                        />
                      );
                    })}
                  </PosterList>
                  {/* <ol>
                    {movies.map((movie) => {
                      return (
                        <li key={movie.imdbId} className={listItemCss}>
                          <WatchlistMoviePoster movie={movie} />
                          <WatchlistMovieTitle movie={movie} />
                          <WatchlistMovieSlug movie={movie} />
                          <WatchlistMovieCheckMark movie={movie} />
                        </li>
                      );
                    })}
                  </ol> */}
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
                  Show More
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
  fragment WatchlistMovie on WatchlistMoviesJson {
    imdbId
    title
    year
    releaseDate
    sortTitle
    reviewedMovie {
      slug
    }
    directorNames
    performerNames
    writerNames
    collectionNames
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

  query WatchlistIndexPage {
    watchlist: allWatchlistMoviesJson(
      sort: { fields: [releaseDate], order: ASC }
    ) {
      nodes {
        ...WatchlistMovie
      }
      releaseYears: distinct(field: year)
      directors: distinct(field: directorNames)
      performers: distinct(field: performerNames)
      writers: distinct(field: writerNames)
      collections: distinct(field: collectionNames)
    }
  }
`;
