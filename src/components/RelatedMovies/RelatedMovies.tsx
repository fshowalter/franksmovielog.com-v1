import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { StillList, StillListHeading, StillListNav } from "../StillList";
import { RelatedMoviesForWatchlistEntities } from "./RelatedMoviesForWatchlistEntities";
function MoreReviews({
  reviews,
}: {
  reviews: Queries.RelatedMoviesFragment["browseMore"];
}) {
  return (
    <StillListNav>
      <StillListHeading
        leadText="More"
        linkText="Reviews"
        linkTarget={`/reviews/`}
      />
      <StillList
        movies={reviews}
        seeAllLinkTarget="/reviews/"
        seeAllLinkText="Reviews"
      />
    </StillListNav>
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
      backgroundColor={{ default: "default", tablet: "subtle" }}
      paddingTop={{ default: 0, tablet: 32 }}
      paddingBottom={{ default: 0, tablet: 128 }}
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
      ...StillListMovie
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
