import { graphql } from "gatsby";
import { Article, HeadBuilder } from "../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="404: Not Found"
      description="Dick Laurent is dead."
      image={null}
      article
    />
  );
}

export default function NotFoundPage({
  data,
}: {
  data: Queries.NotFoundPageQuery;
}): JSX.Element {
  return (
    <Article
      image={data.still}
      alt="A lost highway."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviews={data.latestReview.nodes}
    />
  );
}

export const pageQuery = graphql`
  query NotFoundPage {
    still: file(absolutePath: { regex: "/stills/not-found.png$/" }) {
      ...StillSplash
    }
    latestReview: allReviewedTitlesJson(sort: { sequence: DESC }, limit: 4) {
      nodes {
        ...StillListMovie
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "not-found" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
