import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { LongFormText } from "../LongFormText";

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
          <span>on</span> {review.review.date}
        </Box>
      </Box>
      <LongFormText
        maxWidth="prose"
        // eslint-disable-next-line react/no-danger
        text={review.review.linkedHtml}
      />
    </Box>
  );
}

export const query = graphql`
  fragment ReviewContent on ReviewedMoviesJson {
    grade
    review {
      linkedHtml
      date(formatString: "ddd MMM DD, YYYY")
    }
  }
`;
