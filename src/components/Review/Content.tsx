import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { LongFormText } from "../LongFormText";

interface IContentProps extends IBoxProps {
  reviewedTitle: Queries.ReviewContentFragment;
}

export function Content({ reviewedTitle, ...rest }: IContentProps) {
  return (
    <Box display="flex" flexDirection="column" rowGap={32} {...rest}>
      <Box display="flex" flexDirection="column" alignItems="inherit">
        <Grade grade={reviewedTitle.review.frontmatter.grade} height={32} />
        <Box
          display="flex"
          flexDirection="column"
          color="subtle"
          alignItems="inherit"
          letterSpacing={0.5}
        >
          <span>on</span> {reviewedTitle.review.frontmatter.date}
        </Box>
      </Box>
      <LongFormText
        maxWidth="prose"
        // eslint-disable-next-line react/no-danger
        text={reviewedTitle.review.linkedHtml}
      />
    </Box>
  );
}

export const query = graphql`
  fragment ReviewContent on ReviewedTitlesJson {
    review {
      linkedHtml
      frontmatter {
        grade
        date(formatString: "ddd MMM DD, YYYY")
      }
    }
  }
`;
