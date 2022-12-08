import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { RenderedMarkdown } from "../RenderedMarkdown";

interface IReviewContentProps extends IBoxProps {
  movie: Queries.ReviewContentFragment;
}

export function ReviewContent({ movie, ...rest }: IReviewContentProps) {
  return (
    <Box display="flex" flexDirection="column" rowGap={32} {...rest}>
      <Box
        display="flex"
        flexDirection="column"
        rowGap={8}
        alignItems="inherit"
      >
        <Grade grade={movie.grade} height={32} width={160} />
        <Box
          display="flex"
          flexDirection="column"
          color="muted"
          alignItems="inherit"
          rowGap={8}
        >
          <span>on</span> {movie.viewings[0].date}
        </Box>
      </Box>
      <RenderedMarkdown
        maxWidth="prose"
        // eslint-disable-next-line react/no-danger
        text={movie.review.linkedHtml}
      />
    </Box>
  );
}

export const query = graphql`
  fragment ReviewContent on ReviewedMoviesJson {
    grade
    viewings {
      date: viewingDate(formatString: "ddd MMM DD, YYYY")
    }
    review {
      linkedHtml
    }
  }
`;
