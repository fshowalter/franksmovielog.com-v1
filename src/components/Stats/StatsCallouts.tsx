import { graphql } from "gatsby";
import { Box } from "../Box";

function Callout({
  stat,
  label,
}: {
  stat: number;
  label: string;
}): JSX.Element {
  return (
    <Box
      boxShadow="borderAll"
      borderRadius="half"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height={144}
      width={144}
      textAlign="center"
    >
      <Box fontSize="xLarge">{stat.toLocaleString()}</Box>{" "}
      <Box color="subtle">{label}</Box>
    </Box>
  );
}

export function StatsCallouts({
  viewingCallouts,
  reviewCallouts,
}: {
  viewingCallouts: Queries.ViewingCalloutsFragment | null;
  reviewCallouts: Queries.ReviewCalloutsFragment | null;
}): JSX.Element {
  return (
    <Box
      display="flex"
      columnGap={24}
      rowGap={24}
      justifyContent="center"
      flexWrap={{ default: "wrap", desktop: "nowrap" }}
    >
      {viewingCallouts && (
        <>
          <Callout label="Viewings" stat={viewingCallouts.viewingCount} />
          <Callout label="Movies" stat={viewingCallouts.movieCount} />
        </>
      )}
      {viewingCallouts &&
        viewingCallouts.movieCount != viewingCallouts.newMovieCount && (
          <Callout label="New Movies" stat={viewingCallouts.newMovieCount} />
        )}
      {reviewCallouts && (
        <>
          <Callout label="Reviews" stat={reviewCallouts.reviewsCreated} />
          <Callout
            label="From Watchlist"
            stat={reviewCallouts.watchlistTitlesReviewed}
          />
        </>
      )}
    </Box>
  );
}

export const query = graphql`
  fragment AllTimeViewingCallouts on AllTimeStatsJson {
    titleCount
    viewingCount
  }

  fragment YearViewingCallouts on YearStatsJson {
    titleCount
    newTitleCount
    viewingCount
  }

  fragment ReviewCallouts on AllTimeStatsJson {
    reviewCount
    watchlistTitlesReviewedCount
  }
`;
