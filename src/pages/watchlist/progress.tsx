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
  return <WatchlistProgress progress={data.watchlistProgress} />;
}

export const pageQuery = graphql`
  query WatchlistProgressPage {
    watchlistProgress {
      ...WatchlistProgress
    }
  }
`;
