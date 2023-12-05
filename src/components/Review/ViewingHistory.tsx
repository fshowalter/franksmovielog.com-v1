import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Spacer } from "../Spacer";
import { ViewingHistoryEntry } from "./ViewingHistoryEntry";

interface IIViewingHistoryProps extends IBoxProps {
  review: Queries.ViewingHistoryFragment;
}
export function ViewingHistory({ review, ...rest }: IIViewingHistoryProps) {
  return (
    <Box {...rest}>
      <Box
        as="h3"
        color="subtle"
        fontSize="medium"
        fontWeight="normal"
        paddingX="gutter"
        boxShadow="borderBottom"
        {...rest}
      >
        Viewing History
        <Spacer size={8} axis="vertical" />
      </Box>
      <Box as="ul">
        {review.viewings.map((viewing) => (
          <ViewingHistoryEntry
            as="li"
            key={viewing.sequence}
            viewing={viewing}
          />
        ))}
      </Box>
    </Box>
  );
}

export const query = graphql`
  fragment ViewingHistory on ReviewedTitlesJson {
    viewings {
      ...ViewingHistoryEntry
    }
  }
`;
