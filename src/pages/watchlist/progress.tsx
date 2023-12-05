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
    watchlistProgress {
      ...WatchlistProgress
    }
  }
`;
