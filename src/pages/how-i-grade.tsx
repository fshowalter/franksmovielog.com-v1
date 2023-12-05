import { graphql } from "gatsby";
import { Article, HeadBuilder } from "../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="How I Grade"
      description="The criteria I use to rate movies on this site."
      image={null}
      article
    />
  );
}

export default function HowIGradePage({
  data,
}: {
  data: Queries.HowIGradePageQuery;
}): JSX.Element {
  return (
    <Article
      image={data.still}
      alt="Empty cinema seats."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviews={data.latestReview.nodes}
    />
  );
}

export const pageQuery = graphql`
  query HowIGradePage {
    still: file(absolutePath: { regex: "/stills/how-i-grade.png$/" }) {
      ...StillSplash
    }
    latestReview: allReviewedTitlesJson(sort: { sequence: DESC }, limit: 4) {
      nodes {
        ...StillListMovie
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "how-i-grade" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
