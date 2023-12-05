import { graphql } from "gatsby";
import { HeadBuilder, WatchlistEntities } from "../../components/";

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
      entityType="director"
      title="Directors"
      tagline="Drama is life with the dull bits cut out."
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistDirectorsPage {
    entity: allWatchlistDirectorsJson(sort: { name: ASC }) {
      nodes {
        ...WatchlistEntitiesItem
      }
    }
  }
`;
