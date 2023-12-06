import { graphql } from "gatsby";
import { Article, HeadBuilder } from "../components";

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
    <Article
      image={data.still}
      alt="A coffee cup with the word BEGIN on it."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviewedTitles={data.latestReviewedTitle.nodes}
    />
  );
}

export const pageQuery = graphql`
  query AboutPage {
    still: file(absolutePath: { regex: "/stills/about.png$/" }) {
      ...StillSplash
    }
    latestReviewedTitle: allReviewedTitlesJson(
      sort: { sequence: DESC }
      limit: 4
    ) {
      nodes {
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
