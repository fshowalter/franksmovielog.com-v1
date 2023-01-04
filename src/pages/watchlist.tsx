import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { HeadBuilder } from "../components/HeadBuilder";
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { PosterListWithFilters } from "../components/PosterListWithFilters";
import { Spacer } from "../components/Spacer";
import { WatchlistEntityTypeLink } from "../components/WatchlistEntityTypeLink";
import { WatchlistMovieSlug } from "../components/WatchlistMovieSlug";

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
      <PageTitle textAlign="center">Watchlist</PageTitle>
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
            Track my <Link to="/watchlist/progress/">progress</Link>.
          </p>
        </Box>
      </Box>
      <Spacer axis="vertical" size={32} />
      <Box as="ul" display="flex" flexWrap="wrap" columnGap={32} rowGap={24}>
        <WatchlistEntityTypeLink as="li" flex={1} entityType="director" />
        <WatchlistEntityTypeLink as="li" flex={1} entityType="performer" />
        <WatchlistEntityTypeLink as="li" flex={1} entityType="writer" />
        <WatchlistEntityTypeLink as="li" flex={1} entityType="collection" />
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
