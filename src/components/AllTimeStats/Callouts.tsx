import { graphql } from "gatsby";
import { Box } from "../Box";
import { StatsCallout } from "../Stats";

export function Callouts({
  callouts,
}: {
  callouts: Queries.AllTimeStatusCalloutsFragment | null;
}): JSX.Element {
  return (
    <Box
      display="flex"
      columnGap={24}
      rowGap={24}
      justifyContent="center"
      flexWrap={{ default: "wrap", desktop: "nowrap" }}
    >
      <StatsCallout label="Viewings" stat={callouts.viewingCount} />
      <StatsCallout label="Movies" stat={callouts.titleCount} />
      <StatsCallout label="Reviews" stat={callouts.reviewCount} />
      <StatsCallout
        label="From Watchlist"
        stat={callouts.watchlistTitlesReviewedCount}
      />
    </Box>
  );
}

export const query = graphql`
  fragment AllTimeStatsCallouts on AllTimeStatsJson {
    titleCount
    viewingCount
    reviewCount
    watchlistTitlesReviewedCount
  }
`;
