import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { ViewingHistoryEntry } from "./ViewingHistoryEntry";

interface IIViewingHistoryProps extends IBoxProps {
  movie: Queries.ViewingHistoryFragment;
}
export function ViewingHistory({ movie, ...rest }: IIViewingHistoryProps) {
  return (
    <Box {...rest}>
      <Box
        as="h3"
        color="subtle"
        fontSize="reviewSubHeading"
        fontWeight="normal"
        paddingX="popoutGutter"
        boxShadow="borderBottom"
        {...rest}
      >
        Viewing History
      </Box>
      <Box as="ul">
        {movie.viewings.map((viewing) => (
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
  fragment ViewingHistory on ReviewedMoviesJson {
    viewings {
      ...ViewingHistoryEntry
    }
  }
`;
