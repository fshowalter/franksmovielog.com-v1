import { graphql } from "gatsby";
import { Article, HeadBuilder } from "../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="410: Gone"
      description="Forget it, Jake. It's Chinatown."
      image={null}
      article
    />
  );
}

export default function GonePage({
  data,
}: {
  data: Queries.GonePageQuery;
}): JSX.Element {
  return (
    <Article
      image={data.still}
      alt="Jake Gittes walks away."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviewedTitles={data.latestReviewedTitle.nodes}
    />
  );
}

export const pageQuery = graphql`
  query GonePage {
    still: file(absolutePath: { regex: "/stills/gone.png$/" }) {
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
    page: markdownRemark(frontmatter: { slug: { eq: "gone" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
