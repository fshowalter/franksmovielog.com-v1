import { graphql } from "gatsby";
import { RelatedMoviesList } from "../RelatedMoviesList";
import { RelatedMoviesListHeading } from "../RelatedMoviesListHeading";
import { RelatedMoviesNav } from "../RelatedMoviesNav";

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
                avatar={entity.avatar}
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
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 40
          height: 40
          placeholder: BLURRED
        )
      }
    }
    browseMore(sourceReviewId: $id) {
      ...RelatedMovie
    }
  }
`;
