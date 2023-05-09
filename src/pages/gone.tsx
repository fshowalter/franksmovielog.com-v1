import { graphql } from "gatsby";
import { ArticlePage } from "../components/ArticlePage";
import { HeadBuilder } from "../components/HeadBuilder";

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
    <ArticlePage
      image={data.still}
      alt="Jake Gittes walks away."
      articleText={data.page?.html}
      title={data.page?.frontmatter?.title}
      moreReviews={data.latestViewings.map((viewing) => viewing.reviewedMovie)}
    />
  );
}

export const pageQuery = graphql`
  query GonePage {
    still: file(absolutePath: { regex: "/stills/gone.png$/" }) {
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
    page: markdownRemark(frontmatter: { slug: { eq: "gone" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
