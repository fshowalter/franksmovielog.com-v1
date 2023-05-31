import { graphql } from "gatsby";
import { HeadBuilder, WatchlistProgress } from "../../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Watchlist Progress"
      description="My progress working through my movie review bucketlist."
      article={false}
      image={null}
    />
  );
}

export default function WatchlistProgressPage({
  data,
}: {
  data: Queries.WatchlistProgressPageQuery;
}): JSX.Element {
  return (
    <WatchlistProgress
      movieCount={data.watchlistMovies.totalCount}
      reviewedMovieCount={data.reviewedMovies.totalCount}
      directorMovieCount={data.directorTotal.sum}
      directorReviewedMovieCount={data.directorReviewed.sum}
      performerMovieCount={data.performerTotal.sum}
      performerReviewedMovieCount={data.performerReviewed.sum}
      writerMovieCount={data.writerTotal.sum}
      writerReviewedMovieCount={data.writerReviewed.sum}
      collectionMovieCount={data.collectionTotal.sum}
      collectionReviewedMovieCount={data.collectionReviewed.sum}
      directorProgress={data.director.nodes}
      performerProgress={data.performer.nodes}
      writerProgress={data.writer.nodes}
      collectionProgress={data.collection.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistProgressPage {
    reviewedMovies: allWatchlistMoviesJson(filter: { slug: { ne: null } }) {
      totalCount
    }
    watchlistMovies: allWatchlistMoviesJson {
      totalCount
    }
    director: allWatchlistEntitiesJson(
      filter: { entityType: { eq: director } }
    ) {
      nodes {
        ...WatchlistProgressForEntitiesItem
      }
    }
    directorTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: director } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    directorReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: director } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
    performer: allWatchlistEntitiesJson(
      filter: { entityType: { eq: performer } }
    ) {
      nodes {
        ...WatchlistProgressForEntitiesItem
      }
    }
    performerTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: performer } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    performerReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: performer } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
    writer: allWatchlistEntitiesJson(filter: { entityType: { eq: writer } }) {
      nodes {
        ...WatchlistProgressForEntitiesItem
      }
    }
    writerTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: writer } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    writerReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: writer } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
    collection: allWatchlistEntitiesJson(
      filter: { entityType: { eq: collection } }
    ) {
      nodes {
        ...WatchlistProgressForEntitiesItem
      }
    }
    collectionTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: collection } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    collectionReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: collection } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
  }
`;
