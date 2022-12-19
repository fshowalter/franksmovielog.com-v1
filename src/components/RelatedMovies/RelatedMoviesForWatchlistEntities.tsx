import { graphql } from "gatsby";
import { RelatedMoviesList } from "./RelatedMoviesList";
import { RelatedMoviesListHeading } from "./RelatedMoviesListHeading";
import { RelatedMoviesNav } from "./RelatedMoviesNav";

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
            <RelatedMoviesNav key={`${entity.entityType}s/${entity.slug}`}>
              <RelatedMoviesListHeading
                leadText={`More${leadText[entity.entityType]}`}
                linkTarget={`/watchlist/${entity.entityType}s/${entity.slug}`}
                linkText={entity.name}
              />
              <RelatedMoviesList
                movies={entity.browseMore}
                seeAllLinkTarget={`/watchlist/${entity.entityType}s/${entity.slug}/`}
                seeAllLinkText={`${leadText[entity.entityType]} ${entity.name}`}
              />
            </RelatedMoviesNav>
          );
        })}
    </>
  );
}

export const query = graphql`
  fragment RelatedMoviesForWatchlistEntity on ReviewedMovieWatchlistEntity {
    name
    slug
    entityType
    browseMore(sourceReviewId: $id) {
      ...RelatedMovie
    }
  }
`;
