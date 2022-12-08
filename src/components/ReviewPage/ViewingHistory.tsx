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
        fontSize={16}
        fontWeight="semiBold"
        letterSpacing={0.2}
        lineHeight={2}
        boxShadow="borderBottom"
        paddingX="gutter"
      >
        Viewing History
      </Box>
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
