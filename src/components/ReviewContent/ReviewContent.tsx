import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { reviewTypographyStyle } from "./ReviewContent.css";

interface IReviewContentProps extends IBoxProps {
  review: Queries.ReviewContentFragment;
}

export function ReviewContent({ review, ...rest }: IReviewContentProps) {
  return (
    <Box display="flex" flexDirection="column" rowGap={32} {...rest}>
      <Box display="flex" flexDirection="column" alignItems="inherit">
        <Grade grade={review.grade} height={32} />
        <Box
          display="flex"
          flexDirection="column"
          color="subtle"
          alignItems="inherit"
          letterSpacing={0.5}
        >
          <span>on</span> {review.viewings[0].date}
        </Box>
      </Box>
      <RenderedMarkdown
        maxWidth="prose"
        className={reviewTypographyStyle}
        // eslint-disable-next-line react/no-danger
        text={review.review.linkedHtml}
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
