import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { ReviewSubHeading } from "../ReviewSubHeading";
import { ViewingHistoryEntry } from "./ViewingHistoryEntry";

interface IIViewingHistoryProps extends IBoxProps {
  movie: Queries.ViewingHistoryFragment;
}
export function ViewingHistory({ movie, ...rest }: IIViewingHistoryProps) {
  return (
    <Box {...rest}>
      <ReviewSubHeading paddingX="popoutGutter">
        Viewing History
      </ReviewSubHeading>
      <Box as="ul" padding={0}>
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
