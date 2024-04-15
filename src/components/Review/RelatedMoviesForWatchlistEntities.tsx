import { graphql } from "gatsby";
import { StillList, StillListHeading, StillListNav } from "../StillList";

const leadText = {
  director: " directed by",
  writer: " written by",
  performer: " with",
  collection: "",
};

function linkTarget(
  entityType: "director" | "writer" | "performer" | "collection",
  slug: string,
): string {
  if (entityType === "collection") {
    return `/collections/${slug}`;
  }

  return `/cast-and-crew/${slug}`;
}

export function RelatedMoviesForWatchlistEntities({
  entityType,
  entities,
}: {
  entityType: "director" | "writer" | "performer" | "collection";
  entities: readonly Queries.RelatedMoviesForWatchlistEntityFragment[];
}) {
  return (
    <>
      {entities.map((entity) => {
        return (
          <StillListNav key={entity.slug}>
            <StillListHeading
              leadText={`More${leadText[entityType]}`}
              linkTarget={linkTarget(entityType, entity.slug)}
              linkText={entity.name}
            />
            <StillList
              movies={entity.titles}
              seeAllLinkTarget={linkTarget(entityType, entity.slug)}
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
