import { graphql } from "gatsby";
import { ArticlePage } from "../components/ArticlePage";
import { HeadBuilder } from "../components/HeadBuilder";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="About"
      description="I have come here to chew bubblegum and kick ass. And I'm all out of bubblegum."
      image={null}
      article
    />
  );
}

export default function AboutPage({
  data,
}: {
  data: Queries.AboutPageQuery;
}): JSX.Element {
  return (
    <ArticlePage
      image={data.still}
      alt="A coffee cup with the word BEGIN on it."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviews={data.latestViewings.map((viewing) => viewing.reviewedMovie)}
    />
  );
}

export const pageQuery = graphql`
  query AboutPage {
    still: file(absolutePath: { regex: "/stills/about.png$/" }) {
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
    page: markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
