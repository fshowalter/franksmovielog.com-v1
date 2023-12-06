import { graphql } from "gatsby";
import { Box } from "../Box";
import { StatsCallout } from "../Stats";

export function Callouts({
  callouts,
}: {
  callouts: Queries.YearStatsCalloutsFragment;
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
      <StatsCallout label="New Movies" stat={callouts.newTitleCount} />
    </Box>
  );
}

export const query = graphql`
  fragment YearStatsCallouts on YearStatsJson {
    titleCount
    viewingCount
    newTitleCount
  }
`;
