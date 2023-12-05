import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { StillList, StillListHeading, StillListNav } from "../StillList";
import { RelatedMoviesForWatchlistEntities } from "./RelatedMoviesForWatchlistEntities";

interface IRelatedMoviesProps extends IBoxProps {
  review: Queries.RelatedMoviesFragment;
}

export function RelatedMovies({ review, ...rest }: IRelatedMoviesProps) {
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
        entities={review.watchlist.collections}
      />
      <RelatedMoviesForWatchlistEntities
        entities={review.watchlist.performers}
      />
      <RelatedMoviesForWatchlistEntities
        entities={review.watchlist.directors}
      />
      <RelatedMoviesForWatchlistEntities entities={review.watchlist.writers} />
      <MoreReviews reviews={review.browseMore} />
    </Box>
  );
}

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

export const query = graphql`
  fragment RelatedMovies on ReviewedTitlesJson {
    more {
      withPerformer {
        ...RelatedMoviesForWatchlistEntity
      }
      directedBy {
        ...RelatedMoviesForWatchlistEntity
      }
      writtenBy {
        ...RelatedMoviesForWatchlistEntity
      }
      inCollection {
        ...RelatedMoviesForWatchlistEntity
      }
      reviews {
        ...StillListMovie
      }
    }
  }
`;
