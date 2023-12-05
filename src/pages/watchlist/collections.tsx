import { graphql } from "gatsby";
import { HeadBuilder, WatchlistEntities } from "../../components/";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`Watchlist Collections`}
      description={`A sortable and filterable list of watchlist collections.`}
      image={null}
      article={false}
    />
  );
}

export default function WatchlistCollectionsPage({
  data,
}: {
  data: Queries.WatchlistCollectionsPageQuery;
}): JSX.Element {
  return (
    <WatchlistEntities
      title="Collections"
      tagline="Round up the usual suspects."
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistCollectionsPage {
    entity: allWatchlistCollectionsJson(sort: { name: ASC }) {
      nodes {
        ...WatchlistEntitiesItem
      }
    }
  }
`;
