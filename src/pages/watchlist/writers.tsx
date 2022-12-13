import { graphql } from "gatsby";
import { HeadBuilder } from "../../components/HeadBuilder";
import { WatchlistEntitiesView } from "../../views/WatchlistEntitiesView";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`Watchlist Writers`}
      description={`A sortable and filterable list of watchlist writers.`}
      image={null}
      article={false}
    />
  );
}

export default function WatchlistWritersPage({
  data,
}: {
  data: Queries.WatchlistWritersPageQuery;
}): JSX.Element {
  return (
    <WatchlistEntitiesView
      title="Writers"
      tagline="It's not a lie. It's a gift for fiction."
      slugPath="writers"
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistWritersPage {
    entity: allWatchlistEntitiesJson(
      sort: { name: ASC }
      filter: { entityType: { eq: "writer" } }
    ) {
      nodes {
        ...WatchlistEntitiesViewItem
      }
    }
  }
`;
