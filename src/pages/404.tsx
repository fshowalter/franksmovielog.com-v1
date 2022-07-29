import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import ArticlePage from "../components/ArticlePage";
import HeadBuilder from "../components/HeadBuilder";

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

export default function NotFoundPage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <ArticlePage
      image={backdrop.childImageSharp.gatsbyImageData}
      alt="A lost highway."
      articleText={page.html}
      title={page.frontmatter.title}
    />
  );
}

interface PageQueryResult {
  data: {
    backdrop: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    page: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

export const pageQuery = graphql`
  query {
    backdrop: file(absolutePath: { regex: "/backdrops/not-found.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 1000
          placeholder: TRACED_SVG
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
