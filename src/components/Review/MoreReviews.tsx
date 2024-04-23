import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { StillList, StillListHeading, StillListNav } from "../StillList";

interface IMoreMoviesProps extends IBoxProps {
  review: Queries.MoreReviewsFragment;
}

export function MoreReviews({ review, ...rest }: IMoreMoviesProps) {
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
      {review.moreCastAndCrew.map((castAndCrewMember) => (
        <MoreReviewsList
          key={castAndCrewMember.slug}
          leadText={leadTextForCreditKind(castAndCrewMember.creditKind)}
          linkText={castAndCrewMember.name}
          linkTarget={`/cast-and-crew/${castAndCrewMember.slug}`}
          reviews={castAndCrewMember.titles}
        />
      ))}

      {review.moreCollections.map((collection) => (
        <MoreReviewsList
          key={collection.slug}
          leadText="More"
          linkText={collection.name}
          linkTarget={`/collections/${collection.slug}`}
          reviews={collection.titles}
        />
      ))}

      <MoreReviewsList
        leadText="More"
        linkText="Reviews"
        linkTarget="/reviews/"
        reviews={review.moreReviews}
      />
    </Box>
  );
}

function leadTextForCreditKind(creditKind: string): string {
  switch (creditKind) {
    case "director": {
      return "More directed by";
    }
    case "performer": {
      return "More with";
    }
    case "writer": {
      return "More written by";
    }
    default: {
      throw new Error(`Unknown credit kind ${creditKind}`);
    }
  }
}

function MoreReviewsList({
  reviews,
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  reviews: readonly Queries.StillListMovieFragment[];
}) {
  return (
    <StillListNav>
      <StillListHeading
        leadText={leadText}
        linkText={linkText}
        linkTarget={linkTarget}
      />
      <StillList
        movies={reviews}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
      />
    </StillListNav>
  );
}

export const query = graphql`
  fragment MoreReviewsCastAndCrewMember on ReviewedTitleMoreCastAndCrewMember {
    name
    slug
    creditKind
    titles {
      ...StillListMovie
    }
  }

  fragment MoreReviewsCollection on ReviewedTitleMoreCollection {
    name
    slug
    titles {
      ...StillListMovie
    }
  }

  fragment MoreReviews on ReviewedTitlesJson {
    moreCastAndCrew {
      ...MoreReviewsCastAndCrewMember
    }
    moreCollections {
      ...MoreReviewsCollection
    }
    moreReviews {
      ...StillListMovie
    }
  }
`;
