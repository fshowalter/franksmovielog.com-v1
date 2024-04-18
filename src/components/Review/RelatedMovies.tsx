import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { StillList, StillListHeading, StillListNav } from "../StillList";
import { RelatedMoviesList } from "./RelatedMoviesList";

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
      {review.more.castAndCrew.map({person} => {
        <RelatedMoviesList
        entityType="collection"
        entities={review.more.inCollection}
      />  
      })}
      <RelatedMoviesList
        entityType="collection"
        entities={review.more.inCollection}
      />
      <RelatedMoviesList
        entityType="performer"
        entities={review.more.withPerformer}
      />
      <RelatedMoviesList
        entityType="director"
        entities={review.more.directedBy}
      />
      <RelatedMoviesList entityType="writer" entities={review.more.writtenBy} />
      <MoreReviews reviews={review.more.reviews} />
    </Box>
  );
}

function MoreReviews({
  reviews,
}: {
  reviews: readonly Queries.StillListMovieFragment[];
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
      castAndCrew {
        ...RelatedMoviesListItem
      }
      collections {
        ...RelatedMoviesListItem
      }
      reviews {
        ...StillListMovie
      }
    }
  }
`;
