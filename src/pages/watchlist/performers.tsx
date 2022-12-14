import { graphql } from "gatsby";
import { HeadBuilder } from "../../components/HeadBuilder";
import { WatchlistEntityAvatarListWithFilters } from "../../components/WatchlistEntityAvatarListWithFilters";

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
    <WatchlistEntityAvatarListWithFilters
      title="Performers"
      tagline="Talk low, talk slow, and don't talk too much."
      slugPath="directors"
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistPerformersPage {
    entity: allWatchlistEntitiesJson(
      sort: { name: ASC }
      filter: { entityType: { eq: "performer" } }
    ) {
      nodes {
        ...WatchlistEntityAvatarListItem
      }
    }
  }
`;
