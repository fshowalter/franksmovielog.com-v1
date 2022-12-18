import { graphql } from "gatsby";
import type { IBoxProps } from "../components/Box";
import { Box } from "../components/Box";
import { HeadBuilder } from "../components/HeadBuilder";
import { Link } from "../components/Link";
import { PosterListWithFilters } from "../components/PosterListWithFilters";
import { Spacer } from "../components/Spacer";
import { foregroundColors } from "../styles/colors.css";
import { toSentenceArray } from "../utils";

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
    <Box
      color="subtle"
      fontSize="small"
      fontWeight="light"
      lineHeight={16}
      letterSpacing={0.5}
    >
      Because {toSentenceArray(credits)}.
    </Box>
  );
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
        alignItems="center"
        minWidth={128}
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
        alignItems="center"
        minWidth={128}
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
  return (
    <PosterListWithFilters
      distinctDirectors={data.watchlist.directors}
      distinctPerformers={data.watchlist.performers}
      distinctWriters={data.watchlist.writers}
      distinctCollections={data.watchlist.collections}
      distinctReleaseYears={data.watchlist.releaseYears}
      items={data.watchlist.nodes}
      initialSort="release-date-asc"
      toggleReviewed={true}
      posterDetails={(movie) => (
        <WatchlistMovieSlug movie={movie as Queries.WatchlistMovieFragment} />
      )}
    >
      <Box as="h1" fontSize="pageTitle" textAlign="center">
        Watchlist
      </Box>
      <Box color="subtle">
        <Box as="q" display="block" textAlign="center" color="subtle">
          A man&apos;s got to know his limitations.
        </Box>
        <Spacer axis="vertical" size={16} />
        <Box color="subtle">
          <Spacer axis="vertical" size={16} />
          <p>
            My movie review bucketlist.{" "}
            {data.watchlist.nodes.length.toLocaleString()} titles. No silents or
            documentaries.{" "}
          </p>
          <Spacer axis="vertical" size={16} />
          <p>
            Track my{" "}
            <Link
              textDecoration="none"
              color="accent"
              to="/watchlist/progress/"
            >
              progress
            </Link>
            .
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
        <WatchlistPeopleLinkItem flex={1} to="/watchlist/directors/">
          Directors
        </WatchlistPeopleLinkItem>
        <WatchlistPeopleLinkItem flex={1} to="/watchlist/performers/">
          Performers
        </WatchlistPeopleLinkItem>
        <WatchlistPeopleLinkItem flex={1} to="/watchlist/writers/">
          Writers
        </WatchlistPeopleLinkItem>
        <WatchlistCollectionLinkItem flex={1} to="/watchlist/collections/">
          Collections
        </WatchlistCollectionLinkItem>
      </Box>
    </PosterListWithFilters>
  );
}

export const pageQuery = graphql`
  fragment WatchlistMovie on WatchlistMoviesJson {
    imdbId
    title
    year
    releaseDate
    sortTitle
    slug
    grade
    gradeValue
    directorNames
    performerNames
    writerNames
    collectionNames
    poster {
      ...PosterListPoster
    }
  }

  query WatchlistIndexPage {
    watchlist: allWatchlistMoviesJson(sort: { releaseDate: ASC }) {
      nodes {
        ...WatchlistMovie
      }
      releaseYears: distinct(field: { year: SELECT })
      directors: distinct(field: { directorNames: SELECT })
      performers: distinct(field: { performerNames: SELECT })
      writers: distinct(field: { writerNames: SELECT })
      collections: distinct(field: { collectionNames: SELECT })
    }
  }
`;
