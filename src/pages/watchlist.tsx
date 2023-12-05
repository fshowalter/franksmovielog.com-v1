import { graphql } from "gatsby";
import { HeadBuilder, Watchlist } from "../components";

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

export default function WatchlistPage({
  data,
}: {
  data: Queries.WatchlistPageQuery;
}): JSX.Element {
  return (
    <Watchlist
      items={data.watchlist.nodes}
      distinctDirectors={data.watchlist.directors}
      distinctPerformers={data.watchlist.performers}
      distinctWriters={data.watchlist.writers}
      distinctCollections={data.watchlist.collections}
      distinctReleaseYears={data.watchlist.releaseYears}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistPage {
    watchlist: allWatchlistTitlesJson(sort: { yearAndImdbId: ASC }) {
      nodes {
        ...WatchlistTitle
      }
      releaseYears: distinct(field: { year: SELECT })
      directors: distinct(field: { directorNames: SELECT })
      performers: distinct(field: { performerNames: SELECT })
      writers: distinct(field: { writerNames: SELECT })
      collections: distinct(field: { collectionNames: SELECT })
    }
  }
`;
