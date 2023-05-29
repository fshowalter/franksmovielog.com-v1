import { graphql } from "gatsby";
import { HeadBuilder } from "../../components/HeadBuilder";
import { WatchlistEntities } from "../../components/WatchlistEntities";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`Watchlist Directors`}
      description={`A sortable and filterable list of watchlist directors.`}
      image={null}
      article={false}
    />
  );
}

export default function WatchlistDirectorsPage({
  data,
}: {
  data: Queries.WatchlistDirectorsPageQuery;
}): JSX.Element {
  return (
    <WatchlistEntities
      title="Directors"
      tagline="Drama is life with the dull bits cut out."
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistDirectorsPage {
    entity: allWatchlistEntitiesJson(
      sort: { name: ASC }
      filter: { entityType: { eq: director } }
    ) {
      nodes {
        ...WatchlistEntitiesItem
      }
    }
  }
`;
