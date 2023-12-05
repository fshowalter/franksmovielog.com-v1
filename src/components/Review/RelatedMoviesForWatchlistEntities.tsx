import { graphql } from "gatsby";
import { StillList, StillListHeading, StillListNav } from "../StillList";

const leadText: Record<Queries.WatchlistEntityType, string> = {
  director: " directed by",
  writer: " written by",
  performer: " with",
  collection: "",
};

export function RelatedMoviesForWatchlistEntities({
  entityType,
  entities,
}: {
  entityType: string;
  entities: readonly Queries.RelatedMoviesForWatchlistEntityFragment[];
}) {
  return (
    <>
      {entities.map((entity) => {
        return (
          <StillListNav key={`${entityType}s/${entity.slug}`}>
            <StillListHeading
              leadText={`More${leadText[entityType]}`}
              linkTarget={`/watchlist/${entityType}s/${entity.slug}`}
              linkText={entity.name}
            />
            <StillList
              movies={entity.titles}
              seeAllLinkTarget={`/watchlist/${entityType}s/${entity.slug}/`}
              seeAllLinkText={`${leadText[entityType]} ${entity.name}`}
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
