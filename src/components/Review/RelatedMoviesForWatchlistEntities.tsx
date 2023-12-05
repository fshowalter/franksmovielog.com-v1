import { graphql } from "gatsby";
import { StillList, StillListHeading, StillListNav } from "../StillList";

const leadText: Record<Queries.WatchlistEntityType, string> = {
  director: " directed by",
  writer: " written by",
  performer: " with",
  collection: "",
};

export function RelatedMoviesForWatchlistEntities({
  entities,
}: {
  entities: readonly Queries.RelatedMoviesForWatchlistEntityFragment[];
}) {
  return (
    <>
      {entities
        .filter((entity) => entity.browseMore.length === 4)
        .map((entity) => {
          return (
            <StillListNav key={`${entity.entityType}s/${entity.slug}`}>
              <StillListHeading
                leadText={`More${leadText[entity.entityType]}`}
                linkTarget={`/watchlist/${entity.entityType}s/${entity.slug}`}
                linkText={entity.name}
              />
              <StillList
                movies={entity.browseMore}
                seeAllLinkTarget={`/watchlist/${entity.entityType}s/${entity.slug}/`}
                seeAllLinkText={`${leadText[entity.entityType]} ${entity.name}`}
              />
            </StillListNav>
          );
        })}
    </>
  );
}

export const query = graphql`
  fragment RelatedMoviesForWatchlistEntity on ReviewedTitleMoreEntity {
    name
    slug
    titles {
      ...StillListMovie
    }
  }
`;
