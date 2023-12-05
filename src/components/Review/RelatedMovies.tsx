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
        entityType="collection"
        entities={review.more.inCollection}
      />
      <RelatedMoviesForWatchlistEntities
        entityType="performer"
        entities={review.more.withPerformer}
      />
      <RelatedMoviesForWatchlistEntities
        entityType="director"
        entities={review.more.directedBy}
      />
      <RelatedMoviesForWatchlistEntities
        entityType="writer"
        entities={review.more.writtenBy}
      />
      <MoreReviews reviews={review.more.reviews} />
    </Box>
  );
}

function MoreReviews({
  reviews,
}: {
  reviews: readonly Queries.ReviewedTitleMoreTitle[];
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
