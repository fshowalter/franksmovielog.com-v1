import { graphql } from "gatsby";
import { HeadBuilder, WatchlistEntities } from "../../components/";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`Watchlist Performers`}
      description={`A sortable and filterable list of watchlist performers.`}
      image={null}
      article={false}
    />
  );
}

export default function WatchlistPerformersPage({
  data,
}: {
  data: Queries.WatchlistPerformersPageQuery;
}): JSX.Element {
  return (
    <WatchlistEntities
      entityType="performer"
      title="Performers"
      tagline="Talk low, talk slow, and don't talk too much."
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistPerformersPage {
    entity: allWatchlistPerformersJson(sort: { name: ASC }) {
      nodes {
        ...WatchlistEntitiesItem
      }
    }
  }
`;
