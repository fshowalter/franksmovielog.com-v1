import { graphql } from "gatsby";
import { ArticlePage } from "../components/ArticlePage";
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
  const { still, page } = data;

  return (
    <ArticlePage
      image={still}
      alt="A lost highway."
      articleText={page?.html}
      title={page?.frontmatter?.title}
    />
  );
}

export const pageQuery = graphql`
  query NotFoundPage {
    still: file(absolutePath: { regex: "/stills/not-found.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 960
          placeholder: BLURRED
        )
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
