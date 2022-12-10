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
  const { still, page } = data;

  return (
    <ArticlePage
      image={still}
      alt="Jake Gittes walks away."
      articleText={page?.html}
      title={page?.frontmatter?.title}
    />
  );
}

export const pageQuery = graphql`
  query GonePage {
    still: file(absolutePath: { regex: "/stills/gone.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 960
          placeholder: TRACED_SVG
        )
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
