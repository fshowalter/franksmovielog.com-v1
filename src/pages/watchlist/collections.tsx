import { graphql } from "gatsby";
import { HeadBuilder } from "../../components/HeadBuilder";
import { WatchlistEntityAvatarListWithFilters } from "../../components/WatchlistEntityAvatarListWithFilters";

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
    <WatchlistEntityAvatarListWithFilters
      title="Collections"
      tagline="Round up the usual suspects."
      entities={data.entity.nodes}
    />
  );
}

export const pageQuery = graphql`
  query WatchlistCollectionsPage {
    entity: allWatchlistEntitiesJson(
      sort: { name: ASC }
      filter: { entityType: { eq: collection } }
    ) {
      nodes {
        ...WatchlistEntityAvatarListItem
      }
    }
  }
`;
