import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { RelatedMoviesList } from "../RelatedMoviesList";
import { RelatedMoviesListHeading } from "../RelatedMoviesListHeading";
import { RelatedMoviesNav } from "../RelatedMoviesNav";
import { RelatedMoviesForWatchlistEntities } from "../RelatedMoviesWatchlistEntities";
function MoreReviews({
  reviews,
}: {
  reviews: Queries.RelatedMoviesFragment["browseMore"];
}) {
  return (
    <RelatedMoviesNav>
      <RelatedMoviesListHeading
        leadText="More"
        linkText="Reviews"
        linkTarget={`/reviews/`}
      />
      <RelatedMoviesList
        movies={reviews}
        seeAllLinkTarget="/reviews/"
        seeAllLinkText="Reviews"
      />
    </RelatedMoviesNav>
  );
}

interface IRelatedMoviesProps extends IBoxProps {
  relatedMovies: Queries.RelatedMoviesFragment;
}

export function RelatedMovies({ relatedMovies, ...rest }: IRelatedMoviesProps) {
  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      rowGap={{ default: 48, desktop: 96 }}
      alignItems="center"
      backgroundColor={{ default: "default", desktop: "subtle" }}
      paddingTop={{ default: 0, desktop: 32 }}
      paddingBottom={{ default: 0, desktop: 128 }}
    >
      <RelatedMoviesForWatchlistEntities
        entities={relatedMovies.watchlist.collections}
      />
      <RelatedMoviesForWatchlistEntities
        entities={relatedMovies.watchlist.performers}
      />
      <RelatedMoviesForWatchlistEntities
        entities={relatedMovies.watchlist.directors}
      />
      <RelatedMoviesForWatchlistEntities
        entities={relatedMovies.watchlist.writers}
      />
      <MoreReviews reviews={relatedMovies.browseMore} />
    </Box>
  );
}

export const query = graphql`
  fragment RelatedMovies on ReviewedMoviesJson {
    browseMore {
      ...RelatedMovie
    }
    watchlist {
      performers {
        ...RelatedMoviesForWatchlistEntity
      }
      directors {
        ...RelatedMoviesForWatchlistEntity
      }
      writers {
        ...RelatedMoviesForWatchlistEntity
      }
      collections {
        ...RelatedMoviesForWatchlistEntity
      }
    }
  }
`;
