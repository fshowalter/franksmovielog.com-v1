import { graphql } from "gatsby";
import { ArticleLayout } from "../components/ArticleLayout";
import { HeadBuilder } from "../components/HeadBuilder";

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
    <ArticleLayout
      image={data.still}
      alt="A lost highway."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviews={data.latestViewings.map((viewing) => viewing.reviewedMovie)}
    />
  );
}

export const pageQuery = graphql`
  query NotFoundPage {
    still: file(absolutePath: { regex: "/stills/not-found.png$/" }) {
      ...StillSplash
    }
    latestViewings: viewingsWithReviewOrNote(
      sort: { sequence: DESC }
      limit: 4
    ) {
      reviewedMovie {
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
